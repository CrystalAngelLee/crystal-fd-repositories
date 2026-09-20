/**
 * 术语解释：system + few-shot → JSON（供 CLI 与 BFF 共用）
 */

export function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`缺少环境变量 ${name}。`);
  }
  return value;
}

export function parseModelJson(content) {
  const trimmed = content.trim();
  const fenced = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  const raw = fenced ? fenced[1] : trimmed;
  return JSON.parse(raw);
}

export function assertPayload(data) {
  if (!data || typeof data !== "object") {
    throw new Error("根节点不是对象");
  }
  if (typeof data.term !== "string" || typeof data.oneLiner !== "string") {
    throw new Error(`字段不符合约定: ${JSON.stringify(data)}`);
  }
  if (typeof data.scene !== "string") {
    throw new Error(`缺少 scene 字段: ${JSON.stringify(data)}`);
  }
  return data;
}

export async function explainTerm(term) {
  const trimmed = String(term ?? "").trim();
  if (!trimmed) {
    throw new Error("term 不能为空");
  }

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
            "你是资深前端，面向初学者。",
            "只输出一个 JSON 对象，不要 Markdown，不要代码块，不要其它文字。",
            '形状固定：{"term": string, "oneLiner": string, "scene": string}',
            "oneLiner：中文定义，≤40 字；scene：一个具体使用场景，≤30 字。",
            "不确定就在 oneLiner 里写「不确定」。",
          ].join("\n"),
        },
        { role: "user", content: "术语：Promise" },
        {
          role: "assistant",
          content: JSON.stringify({
            term: "Promise",
            oneLiner: "表示异步操作最终成功或失败及其结果的对象。",
            scene: "用 fetch 拿接口数据时链式处理结果。",
          }),
        },
        { role: "user", content: "术语：闭包" },
        {
          role: "assistant",
          content: JSON.stringify({
            term: "闭包",
            oneLiner: "函数与其词法环境的组合，可访问外部变量。",
            scene: "在循环里用函数记住每次的索引。",
          }),
        },
        { role: "user", content: `术语：${trimmed}` },
      ],
      temperature: 0.1,
      max_tokens: 220,
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    const err = new Error(`上游调用失败 ${res.status}`);
    err.status = res.status;
    err.upstream = data;
    throw err;
  }

  const text = data.choices?.[0]?.message?.content;
  if (typeof text !== "string") {
    throw new Error(`响应格式异常: ${JSON.stringify(data)}`);
  }

  return {
    raw: text,
    data: assertPayload(parseModelJson(text)),
  };
}
