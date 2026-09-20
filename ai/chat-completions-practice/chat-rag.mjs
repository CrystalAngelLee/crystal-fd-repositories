/**
 * RAG 最小对比：同一问题跑两遍
 * - 无检索：模型只靠自身知识（对本仓库虚构设定常会瞎编或说不知道）
 * - 有检索：把命中的本地 knowledge/*.md 塞进 user，再生成
 */

import { retrieve } from "./lib/retrieve.mjs";

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

async function answerWithoutRag(question) {
  return ask([
    {
      role: "system",
      content:
        "你是助手。若不确定就说「不确定」，不要编造产品内部规定。",
    },
    { role: "user", content: question },
  ]);
}

async function answerWithRag(question) {
  const hits = retrieve(question, { topK: 2 });
  console.log(
    "retrieved:",
    hits.length ? hits.map((h) => `${h.id}(score=${h.score})`).join(", ") : "(none)"
  );

  const context =
    hits.length === 0
      ? "（知识库未命中相关片段）"
      : hits.map((h) => `### ${h.id}\n${h.content}`).join("\n\n");

  return ask([
    {
      role: "system",
      content: [
        "你是助手。只根据「参考资料」回答；资料没有的就说不知道。",
        "不要编造参考资料里没有的域名、比例、天数等细节。",
      ].join(""),
    },
    {
      role: "user",
      content: [`参考资料：\n${context}`, `问题：${question}`].join("\n\n"),
    },
  ]);
}

async function main() {
  const question =
    process.argv.slice(2).join(" ") ||
    "Crystal Notes 生产环境域名是什么？灰度默认先放多少？";

  console.log("Q:", question);
  console.log("\n========== 无 RAG ==========");
  const a0 = await answerWithoutRag(question);
  console.log("A:", a0);

  console.log("\n========== 有 RAG ==========");
  const a1 = await answerWithRag(question);
  console.log("A:", a1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
