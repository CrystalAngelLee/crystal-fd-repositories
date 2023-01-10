# KOA 学习部分
- Koa是Express的下一代基于NodeJS的Web框架
- Koa2是完全使用Promise并配合async来实现异步

### 上下环境的总结
ctx
 .req Node的request
 .res Node的response
 .response koa的response
 .request koa的request
 .state 推荐命名空间 用于中间件传递信息和前端视图
 .app 应用程序引用

**请了解AOP相关知识**

## Koa 鉴权

**哈希Hash - SHA  MD5**
- 把一个不定长摘要定长结果
- 摘要[防篡改]
> xialaoshi ---> x3l3s3
- 雪崩效应
