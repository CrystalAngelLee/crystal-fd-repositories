/**
 * Chat Completions 第一枪（练手脚本）
 *
 * 四步：读密钥 → POST → 检查 res.ok → 取 choices[0].message.content
 */

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `缺少环境变量 ${name}。请复制 .env.example 为 .env 并填写，或 export ${name}=...`
    );
  }
  return value;
}

async function chatOnce(userText) {
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
          content: "你是一个简洁的助手，用中文回答，一到三句话即可。",
        },
        { role: "user", content: userText },
      ],
      temperature: 0.2,
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
  return text;
}

async function main() {
  const question = process.argv.slice(2).join(" ") || "用一句话解释什么是 Promise。";
  console.log("Q:", question);
  const answer = await chatOnce(question);
  console.log("A:", answer);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
