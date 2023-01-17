const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  mode: "development",
  entry: ["./src/main.js"],
  output: {
    filename: "[name]-[contenthash:8].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"), // html所在路径
    compress: true, // 是否压缩
    port: 3000, // 端口
    hot: true, // 热部署
    open: true, // 打包完成后自动打开网页
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: ["vue-style-loader", "style-loader", "css-loader", "less-loader"],
      },
      {
        test: /.(png|jpe?j|gif|svg)(\?.*)?$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10 * 1024, // 10 KB
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "public/index.html", // 模板地址
      filename: "index.html",
      title: "vue demo", // title
      favicon: "public/favicon.ico", // 图标
    }),
    new VueLoaderPlugin(),
  ],
  resolve: {
    extensions: [".vue", ".js"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
};
