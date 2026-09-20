/**
 * L2 BFF：浏览器 → 本服务 → 模型（密钥只在服务端）
 *
 * 启动：npm run bff
 * POST /api/explain       { "term": "事件循环" }
 * POST /api/chat/stream   { "question": "..." }  → SSE
 * 默认端口 3921（可用环境变量 PORT 覆盖）
 */

import http from "node:http";
import { explainTerm } from "./lib/explain-term.mjs";
import { openChatStream } from "./lib/chat-stream.mjs";

const PORT = Number(process.env.PORT) || 3921;

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => {
      const raw = Buffer.concat(chunks).toString("utf8");
      if (!raw) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(raw));
      } catch {
        reject(new Error("请求体不是合法 JSON"));
      }
    });
    req.on("error", reject);
  });
}

function corsHeaders(extra = {}) {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    ...extra,
  };
}

function sendJson(res, status, body) {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    ...corsHeaders(),
  });
  res.end(payload);
}

async function pipeUpstreamSse(upstream, res) {
  res.writeHead(200, corsHeaders({
    "Content-Type": "text/event-stream; charset=utf-8",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
  }));

  const reader = upstream.body.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(Buffer.from(value));
    }
  } finally {
    reader.releaseLock();
    res.end();
  }
}

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, corsHeaders());
    res.end();
    return;
  }

  const url = new URL(req.url || "/", `http://${req.headers.host}`);

  if (req.method === "GET" && url.pathname === "/api/health") {
    sendJson(res, 200, { ok: true });
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/explain") {
    try {
      const body = await readJsonBody(req);
      const { raw, data } = await explainTerm(body.term);
      sendJson(res, 200, { ok: true, raw, data });
    } catch (err) {
      const status = err.status && err.status >= 400 ? 502 : 400;
      sendJson(res, status, {
        ok: false,
        error: err.message || String(err),
        upstream: err.upstream,
      });
    }
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/chat/stream") {
    try {
      const body = await readJsonBody(req);
      const upstream = await openChatStream(body.question);
      await pipeUpstreamSse(upstream, res);
    } catch (err) {
      if (res.headersSent) {
        res.end();
        return;
      }
      const status = err.status && err.status >= 400 ? 502 : 400;
      sendJson(res, status, {
        ok: false,
        error: err.message || String(err),
        upstream: err.upstream,
      });
    }
    return;
  }

  sendJson(res, 404, { ok: false, error: "Not Found" });
});

server.listen(PORT, () => {
  console.log(`BFF listening on http://localhost:${PORT}`);
  console.log('POST /api/explain      { "term": "..." }');
  console.log('POST /api/chat/stream  { "question": "..." }  → SSE');
});
