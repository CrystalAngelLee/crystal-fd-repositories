const HtmlWebpackPlugin = require("html-webpack-plugin");
// 导入模块联邦插件
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  mode: "development",
  devServer: {
    port: 8082,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "fedcontainer",
      // 配置导入模块映射
      remotes: {
        // 字符串 "products" 和被导入模块的 name 属性值对应
        // 属性 products 是映射别名, 是在当前应用中导入该模块时使用的名字
        products: "products@http://localhost:8081/remoteEntry.js",
        cart: "cart@http://localhost:8083/remoteEntry.js",
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
