// mongoose.js
const mongoose = require("mongoose");
// 1.连接
mongoose.connect("mongodb://localhost:27017/crystaltest", { useNewUrlParser: true });
const conn = mongoose.connection;
conn.on("error", () => console.error("连接数据库失败"));
