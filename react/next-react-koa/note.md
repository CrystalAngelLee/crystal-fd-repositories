## Package.json 版本说明

大版本升级可能导致 API 变更

不同版本可能出现一些无法预期的 BUG

```json
"dependencies": {

	"@zeit/next-css": "^1.0.1"

}
```

版本号 "^aa.bb.cc"

^ 表示自动安装当前大版本号下最新的（ 会自动升级小版本，不会升级大版本）

aa 表示大版本号，一般只有 breaking changes 的时候才会更新

bb 一般是修复较大的 BUG

cc 是一些细微的修改

安装指定版本： yarn add koa@2.7.0

## 项目搭建

### 创建 next 项目

- 手动创建

安装 react react-dom next 模块

手动创建 pages 目录（放置所有的页面）

配置 package.json 下 scripts

- 使用 create-next-app

npx 【npx create-next-app projectname】

yarn create 【yarn create create-next-app projectname】

直接调用 create-next-app

### KOA

Next.js 无法处理服务端数据接口，数据库连接，session 状态

Koa 是一个轻量级的 nodeJS 服务端框架

**API**

App.use

Ctx 对象

Request、response、req、res 的关系

### Redis 数据库

docker 安装 redis https://kb.objectrocket.com/redis/run-redis-with-docker-compose-1055

内存数据结构存储

可持久存储

支持多种数据结构

**使用**

https://redis.io/commands

setex 设置过期时间

KEYs \* 可以查找所有 key

DEL a 删除某一个 key

Node 连接 redis=> ioredis

### And design 集成

## Next 基础部分

### getInitialProps

数据获取

- 在页面中获取数据
- 在 App 中获取数据
- NextJS 的数据获取规范！！！！！！！！！！！！

### 自定义 APP

作用

- 固定 Layout
- 保持一些公用的状态
- 给页面传入一些自定义数据
- 自定义错误处理

### 自定义 document

只有在服务端渲染的时候才会被调用

用来修改服务端渲染的文档内容

一般用来配合第三方 css-in-js 方案使用

只有当服务器端渲染才会有作用

### 定义样式

直接使用<style>标签

使用 styled-component

## OAuth

### OAuth 多种授权方式

- Authorization Code
- Refresh Token
- Device Code
- password(一般不会对第三方提供)
- Implicit
- Client Credentials

### OAuth字段

**跳转字段**

client_id

scope // 希望得到的授权  github developer--Authorizing OAuth Apps

redirect_uri, login(是否允许用户通过登录进行授权), state(保证授权的安全性), allow_signup(是否允许用户在没有注册的情况下先注册在登陆授权)

**请求token**

client_id, client_secret（永久保存在服务端）

code

redirect_uri, state

// 获取用户信息 https://api.github.com/user

### OAuth Code 如何保证安全

**策略**

- 一次性的code

- id+secret
- redirect_uri

### Cookie 和 Session

cookie是存储在客户端的一个凭证

