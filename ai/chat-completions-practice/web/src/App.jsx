import { useState } from "react";

/** @typedef {'idle' | 'loading' | 'error' | 'success'} UiStatus */

function ExplainPanel() {
  const [term, setTerm] = useState("事件循环");
  /** @type {[UiStatus, function]} */
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  async function onSubmit(e) {
    e.preventDefault();
    const value = term.trim();
    if (!value) {
      setStatus("error");
      setError("请输入术语");
      setResult(null);
      return;
    }

    setStatus("loading");
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ term: value }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error || `请求失败 ${res.status}`);
      }
      setResult(json.data);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err.message || String(err));
    }
  }

  const busy = status === "loading";

  return (
    <>
      <p className="lead">
        非流式：一次拿完整 JSON。状态 idle → loading → success / error。
      </p>
      <form className="form" onSubmit={onSubmit}>
        <label htmlFor="term">术语</label>
        <input
          id="term"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          disabled={busy}
          placeholder="例如：事件循环"
        />
        <button type="submit" disabled={busy}>
          {busy ? "请求中…" : "解释"}
        </button>
      </form>
      {status === "loading" && <p className="hint">正在调用模型…</p>}
      {status === "error" && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
      {status === "success" && result && (
        <dl className="result">
          <div>
            <dt>term</dt>
            <dd>{result.term}</dd>
          </div>
          <div>
            <dt>oneLiner</dt>
            <dd>{result.oneLiner}</dd>
          </div>
          <div>
            <dt>scene</dt>
            <dd>{result.scene}</dd>
          </div>
        </dl>
      )}
    </>
  );
}

/** @typedef {'idle' | 'streaming' | 'error' | 'done'} StreamStatus */

async function readSseDeltas(res, onDelta) {
  if (!res.body) {
    throw new Error("响应没有 body，无法流式读取");
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const parts = buffer.split("\n");
    buffer = parts.pop() ?? "";

    for (const line of parts) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;
      const data = trimmed.slice(5).trim();
      if (!data || data === "[DONE]") continue;
      let json;
      try {
        json = JSON.parse(data);
      } catch {
        continue;
      }
      const delta = json.choices?.[0]?.delta?.content;
      if (typeof delta === "string" && delta) {
        onDelta(delta);
      }
    }
  }
}

function StreamPanel() {
  const [question, setQuestion] = useState("用三句话解释什么是闭包");
  /** @type {[StreamStatus, function]} */
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [answer, setAnswer] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    const value = question.trim();
    if (!value) {
      setStatus("error");
      setError("请输入问题");
      setAnswer("");
      return;
    }

    setStatus("streaming");
    setError("");
    setAnswer("");

    try {
      const res = await fetch("/api/chat/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: value }),
      });

      const contentType = res.headers.get("content-type") || "";
      if (!res.ok || contentType.includes("application/json")) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || `请求失败 ${res.status}`);
      }

      await readSseDeltas(res, (delta) => {
        setAnswer((prev) => prev + delta);
      });
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err.message || String(err));
    }
  }

  const busy = status === "streaming";

  return (
    <>
      <p className="lead">
        流式：读 SSE 里的 <code>delta.content</code>，边到边拼。状态 idle →
        streaming → done / error。
      </p>
      <form className="form" onSubmit={onSubmit}>
        <label htmlFor="question">问题</label>
        <input
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={busy}
          placeholder="例如：用三句话解释闭包"
        />
        <button type="submit" disabled={busy}>
          {busy ? "生成中…" : "流式提问"}
        </button>
      </form>
      {status === "streaming" && !answer && (
        <p className="hint">等待首个 token…</p>
      )}
      {status === "error" && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
      {(answer || status === "done") && (
        <div className="stream-out" aria-live="polite">
          {answer}
          {status === "streaming" ? <span className="caret">▍</span> : null}
        </div>
      )}
    </>
  );
}

export default function App() {
  const [tab, setTab] = useState("explain");

  return (
    <main className="page">
      <h1>LLM 练手台</h1>
      <nav className="tabs" aria-label="模式">
        <button
          type="button"
          className={tab === "explain" ? "tab active" : "tab"}
          onClick={() => setTab("explain")}
        >
          术语 JSON
        </button>
        <button
          type="button"
          className={tab === "stream" ? "tab active" : "tab"}
          onClick={() => setTab("stream")}
        >
          流式聊天
        </button>
      </nav>
      {tab === "explain" ? <ExplainPanel /> : <StreamPanel />}
    </main>
  );
}
