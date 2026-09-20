# Chat Completions 练手

对应公开笔记：[Chat Completions 入门](https://crystalangellee.github.io/docs/ai/llm_chat_completions)（以你站点实际地址为准）。

用 Node 发一次 `POST .../chat/completions`，把模型回答打印到终端。密钥只放 `.env`，不要提交。

## 免费方案怎么选（国内优先）

国外 Groq / OpenRouter 从国内访问常会**慢或登录不稳**。练手优先用国内、且 **OpenAI 兼容** 的平台（脚本不用改，只改 `.env`）：

| 方案 | 入口 | 特点 | 适合 |
| --- | --- | --- | --- |
| **硅基流动** | [siliconflow.cn](https://siliconflow.cn) | 一 Key 多模型；小模型常有免费/赠额 | **国内新手首选** |
| **智谱 GLM** | [open.bigmodel.cn](https://open.bigmodel.cn) | [OpenAI 兼容说明](https://docs.bigmodel.cn/cn/guide/develop/openai/introduction) | 想用 GLM |
| **阿里云百炼** | [百炼控制台](https://bailian.console.aliyun.com) | 通义；兼容模式 Base URL 见下 | 已有阿里云账号 |
| **DeepSeek** | [platform.deepseek.com](https://platform.deepseek.com) | 注册常送额度，之后很便宜 | 送完也能低成本继续 |
| Ollama | 本机安装 | 完全免费、无 Key | 完全不想注册 |

额度与模型名会变，**以各平台控制台为准**。本脚本只认：`LLM_API_KEY`、`LLM_BASE_URL`、`LLM_MODEL`。

常见 `LLM_BASE_URL`（不要自己拼 `/chat/completions`，脚本会加）：

- 硅基流动：`https://api.siliconflow.cn/v1`
- 智谱：`https://open.bigmodel.cn/api/paas/v4`
- 百炼兼容：`https://dashscope.aliyuncs.com/compatible-mode/v1`
- DeepSeek：`https://api.deepseek.com`

## 准备（以硅基流动为例）

1. 打开硅基流动控制台，创建 API Key，在模型列表里确认一个可用的模型 ID（示例常用 `Qwen/Qwen2.5-7B-Instruct`，若下线则以控制台为准）  
2. 本目录：

```bash
cd ai/chat-completions-practice
cp .env.example .env
```

3. 编辑 `.env`：

```bash
LLM_API_KEY=你的密钥
LLM_BASE_URL=https://api.siliconflow.cn/v1
LLM_MODEL=Qwen/Qwen2.5-7B-Instruct
```

4. **Node 20+**：

```bash
node -v
npm run chat
npm run chat -- 用一句话解释什么是闭包
```

若 Node 不支持 `--env-file`：

```bash
export LLM_API_KEY='...'
export LLM_BASE_URL='https://api.siliconflow.cn/v1'
export LLM_MODEL='Qwen/Qwen2.5-7B-Instruct'
node chat-once.mjs
```

智谱 / 百炼 / DeepSeek 的填法见 `.env.example` 注释。

## 成功 / 失败长什么样

- 成功：终端打印 `Q: ...` 和 `A: ...`  
- 失败：看 `调用失败 <状态码>: {...}`  
  - `401` → 密钥或 Bearer  
  - `404` / 模型相关错误 → `LLM_MODEL` 与控制台不一致  
  - 很慢或超时 → 优先换国内平台，少用 Groq  

## 下一步：输出 JSON

同一套 `.env`，再跑：

```bash
npm run chat:json
npm run chat:json -- 闭包
```

成功时会先打印模型原始 `content`，再打印 `parsed` 对象。说明见公开笔记「让模型输出 JSON」。

## 再下一步：system + few-shot

```bash
npm run chat:fewshot
npm run chat:fewshot -- 事件循环
```

在 `messages` 里带两组示例，再要求多一个 `scene` 字段。说明见「Prompt 基础与少样本」。

## 再下一步：页面 + BFF（L2）

密钥只留在 Node BFF；浏览器打 `/api/explain`。

**终端 1 — BFF：**

```bash
npm run bff
# http://localhost:3921
```

**终端 2 — React 页：**

```bash
cd web && npm install && npm run dev
# 或在上一级：npm run web（需先装过 web 依赖）
# http://localhost:5173  （Vite 已把 /api 代理到 3921）
```

页面输入术语 → loading → 展示 `term` / `oneLiner` / `scene`，或 error。说明见公开笔记「前端产品化：页面 + BFF」。

同一页面还有 **「流式聊天」** Tab：走 `POST /api/chat/stream`（SSE），回答会逐字追加。说明见「流式输出」。改完 `server.mjs` 后需**重启** `npm run bff`。

## 再下一步：Function Calling（L3）

```bash
npm run chat:tools
npm run chat:tools -- 现在几点了？另外 19 加 23 等于多少？
```

会打印第一轮 `tool_calls`、本地工具结果、第二轮最终回答。说明见「Function Calling」。若报不支持 tools，换控制台里标明支持函数调用的模型。

## 再下一步：RAG 有/无对比

本地 `knowledge/*.md` 是虚构的 Crystal Notes 设定。同一问题跑两遍：

```bash
npm run chat:rag
npm run chat:rag -- Crystal Notes 回收站保留几天？
```

先看「无 RAG」，再看关键词检索注入后的「有 RAG」。说明见「RAG 基础」。

### 向量检索

在 `.env` 增加（模型名以控制台 Embeddings 列表为准）：

```bash
LLM_EMBED_MODEL=BAAI/bge-m3
```

```bash
npm run chat:rag:vector
npm run chat:rag:vector -- 笔记被引用多了会有什么内部指标？
```

会建/读本地 `.cache/knowledge-embeddings.json`，打印 keyword vs vector 命中，再生成回答。

### 切块检索

长文不宜整篇一个向量。对比「整篇」与「chunk」：

```bash
npm run chat:rag:chunk
npm run chat:rag:chunk -- 冷静期结束后数据还能恢复吗？
```

可选环境变量：`RAG_CHUNK_CHARS`（默认 280）、`RAG_CHUNK_OVERLAP`（默认 60）、`RAG_TOP_K`（默认 3）。  
切块索引用单独缓存 `.cache/knowledge-embeddings-chunks.json`。

## 再下一步：多工具编排

固定两轮升级为「有 tool_calls 就继续」的循环：

```bash
npm run chat:agent
npm run chat:agent -- 现在几点？小时加 5；回收站保留几天？
```

工具：`get_now` / `add` / `lookup_kb`。可选 `AGENT_MAX_ROUNDS`。说明见「多工具编排」。

## RAG 小评测

固定用例，对比 keyword / vector / chunk 是否命中期望文档（不调 Chat）：

```bash
npm run chat:eval:rag
```

用例在 `eval/rag-cases.json`，可自行增删。

**不要把 `.env`、真实密钥贴到公开地方。**
