const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  devServer: {
    // contentBase: path.join(__dirname, "dist"), // html所在路径
    contentBase: "./public", // 静态资源访问目录
    compress: true, // 是否压缩
    port: 3030, // 端口
    hot: true, // 热部署
    open: true, // 打包完成后自动打开网页
  },
});
