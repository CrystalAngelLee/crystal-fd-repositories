/**
 * L3：Function Calling（工具调用）最小闭环
 *
 * 1) 带 tools 发第一轮
 * 2) 若有 tool_calls → 本地执行 → role:tool 塞回 messages
 * 3) 再请求一轮，打印最终自然语言
 */

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`缺少环境变量 ${name}。`);
  }
  return value;
}

const TOOLS = [
  {
    type: "function",
    function: {
      name: "get_now",
      description: "获取当前本地日期时间字符串。用户问几点、今天几号时使用。",
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
      description: "计算两个数字的和。用户要做加法时使用。",
      parameters: {
        type: "object",
        properties: {
          a: { type: "number", description: "第一个加数" },
          b: { type: "number", description: "第二个加数" },
        },
        required: ["a", "b"],
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
      return JSON.stringify({ error: "arguments 不是合法 JSON", raw: argsJson });
    }
  }

  if (name === "get_now") {
    return JSON.stringify({
      now: new Date().toLocaleString("zh-CN", { hour12: false }),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
  }

  if (name === "add") {
    const a = Number(args.a);
    const b = Number(args.b);
    if (Number.isNaN(a) || Number.isNaN(b)) {
      return JSON.stringify({ error: "a/b 必须是数字", args });
    }
    return JSON.stringify({ a, b, sum: a + b });
  }

  return JSON.stringify({ error: `未知工具: ${name}` });
}

async function chatCompletions(messages, { withTools }) {
  const apiKey = requireEnv("LLM_API_KEY");
  const baseUrl = requireEnv("LLM_BASE_URL").replace(/\/$/, "");
  const model = requireEnv("LLM_MODEL");

  const body = {
    model,
    messages,
    temperature: 0.1,
    max_tokens: 400,
  };
  if (withTools) {
    body.tools = TOOLS;
    // 让模型按需调用；部分兼容网关也认 "auto"
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

async function chatWithTools(userText) {
  const messages = [
    {
      role: "system",
      content:
        "你是助手。需要精确时间或做加法时，必须调用提供的工具，不要自己瞎编数字。最后用中文简短回答用户。",
    },
    { role: "user", content: userText },
  ];

  console.log("--- round 1（带 tools）---");
  const first = await chatCompletions(messages, { withTools: true });
  console.log("assistant message:", JSON.stringify(first, null, 2));

  const toolCalls = first.tool_calls;
  if (!Array.isArray(toolCalls) || toolCalls.length === 0) {
    const text = first.content;
    if (typeof text !== "string") {
      throw new Error(`没有 tool_calls，也没有 content: ${JSON.stringify(first)}`);
    }
    return text;
  }

  // 必须把「带 tool_calls 的 assistant 消息」原样放回剧本
  messages.push(first);

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

  console.log("--- round 2（带回 tool 结果）---");
  const second = await chatCompletions(messages, { withTools: false });
  console.log("assistant message:", JSON.stringify(second, null, 2));

  if (typeof second.content !== "string") {
    throw new Error(`第二轮没有 content: ${JSON.stringify(second)}`);
  }
  return second.content;
}

async function main() {
  const question =
    process.argv.slice(2).join(" ") || "现在几点了？另外帮我算一下 19 加 23 等于多少？";
  console.log("Q:", question);
  const answer = await chatWithTools(question);
  console.log("A:", answer);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
