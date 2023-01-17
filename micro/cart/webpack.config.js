const HtmlWebpackPlugin = require("html-webpack-plugin");

// 导入模块联邦插件
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  mode: "development",
  devServer: {
    port: 8083,
  },
  plugins: [
    // 将 products 自身当做模块暴露出去
    new ModuleFederationPlugin({
      // 模块名称, 具有唯一性, 相当于 single-spa 中的组织名称
      name: "cart",
      // 模块文件名称, 其他应用引入当前模块时需要加载的文件的名字
      filename: "remoteEntry.js",
      // 当前模块具体导出的内容
      exposes: {
        "./Index": "./src/bootstrap",
      },
      shared: {
        faker: {
          singleton: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
