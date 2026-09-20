/**
 * L1 练手：让模型只输出 JSON，再解析成对象
 *
 * 依赖与 chat-once.mjs 相同的 .env
 */

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `缺少环境变量 ${name}。请复制 .env.example 为 .env 并填写。`
    );
  }
  return value;
}

function parseModelJson(content) {
  const trimmed = content.trim();
  const fenced = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  const raw = fenced ? fenced[1] : trimmed;
  return JSON.parse(raw);
}

function assertTermPayload(data) {
  if (!data || typeof data !== "object") {
    throw new Error("根节点不是对象");
  }
  if (typeof data.term !== "string" || typeof data.oneLiner !== "string") {
    throw new Error(`字段不符合约定: ${JSON.stringify(data)}`);
  }
  return data;
}

async function chatJson(term) {
  const apiKey = requireEnv("LLM_API_KEY");
  const baseUrl = requireEnv("LLM_BASE_URL").replace(/\/$/, "");
  const model = requireEnv("LLM_MODEL");

  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "system",
          content: [
            "你是一个只输出 JSON 的助手。",
            "必须遵守：",
            "1. 只输出一个 JSON 对象，不要 Markdown，不要代码块，不要其它说明文字。",
            '2. 形状固定为：{"term": string, "oneLiner": string}',
            "3. oneLiner 用中文，不超过 40 字。",
          ].join("\n"),
        },
        { role: "user", content: `术语：${term}` },
      ],
      temperature: 0.1,
      max_tokens: 200,
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(`调用失败 ${res.status}: ${JSON.stringify(data)}`);
  }

  const text = data.choices?.[0]?.message?.content;
  if (typeof text !== "string") {
    throw new Error(`响应格式异常: ${JSON.stringify(data)}`);
  }

  console.log("raw content:", text);
  const parsed = assertTermPayload(parseModelJson(text));
  return parsed;
}

async function main() {
  const term = process.argv.slice(2).join(" ") || "Promise";
  const obj = await chatJson(term);
  console.log("parsed:", obj);
  console.log("oneLiner:", obj.oneLiner);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
