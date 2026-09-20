/**
 * 多工具编排：while 仍有 tool_calls 就执行并继续请求（有轮次上限）
 *
 * 与 chat-tools.mjs 的差别：不固定「只两轮」，模型可多步连调多个工具。
 */

import { retrieve } from "./lib/retrieve.mjs";

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`缺少环境变量 ${name}。`);
  }
  return value;
}

const MAX_ROUNDS = Number(process.env.AGENT_MAX_ROUNDS || 6);

const TOOLS = [
  {
    type: "function",
    function: {
      name: "get_now",
      description: "获取当前本地日期时间。问几点、今天几号时用。",
      parameters: {
        type: "object",
        properties: {},
        additionalProperties: false,
      },
    },
  },
  {
    type: "function",
    function: {
      name: "add",
      description: "计算两个数字的和。",
      parameters: {
        type: "object",
        properties: {
          a: { type: "number" },
          b: { type: "number" },
        },
        required: ["a", "b"],
        additionalProperties: false,
      },
    },
  },
  {
    type: "function",
    function: {
      name: "lookup_kb",
      description:
        "从本地 Crystal Notes 知识库按关键词检索一段说明。问产品规定、域名、权限、计费、注销等时使用。",
      parameters: {
        type: "object",
        properties: {
          query: { type: "string", description: "检索用的简短中文问句或关键词" },
        },
        required: ["query"],
        additionalProperties: false,
      },
    },
  },
];

function runTool(name, argsJson) {
  let args = {};
  if (argsJson && String(argsJson).trim()) {
    try {
      args = JSON.parse(argsJson);
    } catch {
      return JSON.stringify({
        ok: false,
        error: "arguments 不是合法 JSON，请修正后重试",
        raw: argsJson,
      });
    }
  }

  try {
    if (name === "get_now") {
      return JSON.stringify({
        ok: true,
        now: new Date().toLocaleString("zh-CN", { hour12: false }),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      });
    }

    if (name === "add") {
      const a = Number(args.a);
      const b = Number(args.b);
      if (Number.isNaN(a) || Number.isNaN(b)) {
        return JSON.stringify({
          ok: false,
          error: "a/b 必须是数字，请修正参数后重试",
          args,
        });
      }
      return JSON.stringify({ ok: true, a, b, sum: a + b });
    }

    if (name === "lookup_kb") {
      const query = String(args.query || "").trim();
      if (!query) {
        return JSON.stringify({ ok: false, error: "query 不能为空" });
      }
      const hits = retrieve(query, { topK: 2 });
      if (!hits.length) {
        return JSON.stringify({
          ok: true,
          query,
          hits: [],
          note: "未命中知识库，请换关键词或告诉用户资料里没有",
        });
      }
      return JSON.stringify({
        ok: true,
        query,
        hits: hits.map((h) => ({ id: h.id, score: h.score, content: h.content })),
      });
    }

    return JSON.stringify({ ok: false, error: `未知工具: ${name}` });
  } catch (err) {
    return JSON.stringify({
      ok: false,
      error: err.message || String(err),
      hint: "工具执行失败，可根据 error 换参数重试或改用其它工具",
    });
  }
}

async function chatCompletions(messages, { withTools }) {
  const apiKey = requireEnv("LLM_API_KEY");
  const baseUrl = requireEnv("LLM_BASE_URL").replace(/\/$/, "");
  const model = requireEnv("LLM_MODEL");

  const body = {
    model,
    messages,
    temperature: 0.1,
    max_tokens: 500,
  };
  if (withTools) {
    body.tools = TOOLS;
    body.tool_choice = "auto";
  }

  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(`调用失败 ${res.status}: ${JSON.stringify(data)}`);
  }

  const message = data.choices?.[0]?.message;
  if (!message) {
    throw new Error(`响应格式异常: ${JSON.stringify(data)}`);
  }
  return message;
}

async function runAgent(userText) {
  const messages = [
    {
      role: "system",
      content: [
        "你是助手，可以多步调用工具完成任务。",
        "需要精确时间用 get_now；加法用 add；Crystal Notes 产品规定用 lookup_kb。",
        "不要编造工具结果。若 tool 返回 ok:false，应修正参数再调，或说明失败原因。",
        "信息够了就用中文给出最终简短回答，不要空转调用。",
      ].join(""),
    },
    { role: "user", content: userText },
  ];

  for (let round = 1; round <= MAX_ROUNDS; round++) {
    console.log(`\n========== round ${round} ==========`);
    const msg = await chatCompletions(messages, { withTools: true });
    console.log("assistant:", JSON.stringify(msg, null, 2));

    const toolCalls = msg.tool_calls;
    if (!Array.isArray(toolCalls) || toolCalls.length === 0) {
      if (typeof msg.content === "string" && msg.content.trim()) {
        return msg.content;
      }
      throw new Error(`第 ${round} 轮既无 tool_calls 也无 content`);
    }

    messages.push(msg);

    for (const call of toolCalls) {
      const name = call.function?.name;
      const argStr = call.function?.arguments ?? "{}";
      const result = runTool(name, argStr);
      console.log(`tool ${name}(${argStr}) => ${result}`);
      messages.push({
        role: "tool",
        tool_call_id: call.id,
        content: result,
      });
    }
  }

  throw new Error(`超过最大轮次 MAX_ROUNDS=${MAX_ROUNDS}，仍未给出最终回答`);
}

async function main() {
  const question =
    process.argv.slice(2).join(" ") ||
    "现在几点了？把当前小时数加上 5 得到一个数告诉我；另外查一下 Crystal Notes 回收站保留几天。";

  console.log("Q:", question);
  console.log(`MAX_ROUNDS=${MAX_ROUNDS}`);
  const answer = await runAgent(question);
  console.log("\nA:", answer);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
