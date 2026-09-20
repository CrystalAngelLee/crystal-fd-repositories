/**
 * 流式聊天：上游 stream:true，返回 Response（SSE body）
 */

import { requireEnv } from "./explain-term.mjs";

export async function openChatStream(question) {
  const trimmed = String(question ?? "").trim();
  if (!trimmed) {
    throw new Error("question 不能为空");
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
          content: "你是资深前端，面向初学者。用中文简明回答，不要输出 JSON。",
        },
        { role: "user", content: trimmed },
      ],
      temperature: 0.3,
      max_tokens: 600,
      stream: true,
    }),
  });

  if (!res.ok) {
    let upstream;
    try {
      upstream = await res.json();
    } catch {
      upstream = await res.text();
    }
    const err = new Error(`上游调用失败 ${res.status}`);
    err.status = res.status;
    err.upstream = upstream;
    throw err;
  }

  if (!res.body) {
    throw new Error("上游未返回可读取的流");
  }

  return res;
}
