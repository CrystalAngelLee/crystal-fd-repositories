import express from "express";

const app = express();

// 服务器端程序实现静态资源访问功能，客户端JS打包文件会被作为静态资源使用
app.use(express.static("public"));

app.listen(3000, () => console.log("app is running on 3000 port"));

export default app;
