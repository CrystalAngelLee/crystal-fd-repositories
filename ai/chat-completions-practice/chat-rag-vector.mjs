/**
 * 向量 RAG：embedding 检索 topK → 注入 Prompt → 生成
 * 同时打印关键词检索命中，便于对照
 */

import { retrieve } from "./lib/retrieve.mjs";
import { retrieveByVector } from "./lib/retrieve-vector.mjs";

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`缺少环境变量 ${name}。`);
  }
  return value;
}

async function ask(messages) {
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
      messages,
      temperature: 0.1,
      max_tokens: 400,
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
  return text;
}

function formatHits(label, hits) {
  if (!hits.length) return `${label}: (none)`;
  return `${label}: ${hits
    .map((h) => `${h.id}(${typeof h.score === "number" ? h.score.toFixed(4) : h.score})`)
    .join(", ")}`;
}

async function main() {
  requireEnv("LLM_EMBED_MODEL");

  const question =
    process.argv.slice(2).join(" ") ||
    "笔记被别人引用多了会有什么内部指标？谁能看见？";

  console.log("Q:", question);

  const keywordHits = retrieve(question, { topK: 2 });
  console.log(formatHits("keyword", keywordHits));

  const vectorHits = await retrieveByVector(question, { topK: 2 });
  console.log(formatHits("vector ", vectorHits));

  const context =
    vectorHits.length === 0
      ? "（知识库未命中相关片段）"
      : vectorHits.map((h) => `### ${h.id}\n${h.content}`).join("\n\n");

  const answer = await ask([
    {
      role: "system",
      content:
        "你是助手。只根据「参考资料」回答；资料没有的就说不知道。不要编造资料里没有的细节。",
    },
    {
      role: "user",
      content: [`参考资料：\n${context}`, `问题：${question}`].join("\n\n"),
    },
  ]);

  console.log("\nA:", answer);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
