/**
 * 切块 RAG：对比「整篇向量」vs「chunk 向量」，再用 chunk 结果生成回答
 */

import { retrieveByVector } from "./lib/retrieve-vector.mjs";
import { retrieveByChunkVector } from "./lib/retrieve-chunks.mjs";

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
  return `${label}:\n${hits
    .map((h) => {
      const preview = h.content.replace(/\s+/g, " ").slice(0, 80);
      return `  - ${h.id} score=${h.score.toFixed(4)} | ${preview}…`;
    })
    .join("\n")}`;
}

async function main() {
  requireEnv("LLM_EMBED_MODEL");

  const question =
    process.argv.slice(2).join(" ") ||
    "冷静期结束后数据还能恢复吗？注销前团队主管理员要先做什么？";

  const maxChars = Number(process.env.RAG_CHUNK_CHARS || 280);
  const overlap = Number(process.env.RAG_CHUNK_OVERLAP || 60);
  const topK = Number(process.env.RAG_TOP_K || 3);

  console.log("Q:", question);
  console.log(`chunk opts: maxChars=${maxChars}, overlap=${overlap}, topK=${topK}\n`);

  const wholeHits = await retrieveByVector(question, { topK: 2 });
  console.log(formatHits("whole-doc vector", wholeHits));
  console.log("");

  const chunkHits = await retrieveByChunkVector(question, {
    maxChars,
    overlap,
    topK,
  });
  console.log(formatHits("chunk vector", chunkHits));

  const context =
    chunkHits.length === 0
      ? "（知识库未命中相关片段）"
      : chunkHits.map((h) => `### ${h.id}\n${h.content}`).join("\n\n");

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
