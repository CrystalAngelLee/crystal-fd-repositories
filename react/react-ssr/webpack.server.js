const path = require("path");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base");
// 优化服务器端打包体积：在服务端打包文件中，包含了Node系统模块，导致打包文件本身体积庞大
const nodeExternals = require("webpack-node-externals");

const config = {
  target: "node",
  entry: "./src/server/index.js",
  output: {
    path: path.join(__dirname, "build"),
    filename: "bundle.js",
  },
  externals: [nodeExternals()],
};

module.exports = merge(baseConfig, config);
