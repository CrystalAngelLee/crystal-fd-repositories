const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  entry: ["./src/main.js"],
  output: {
    filename: "[name]-[contenthash:8].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "eslint-loader",
        exclude: /node_modules/,
        enforce: "pre",
      },
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
        use: ["vue-style-loader", "style-loader", "css-loader"],
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
  optimization: {
    usedExports: true,
    concatenateModules: true,
    minimize: true,
    splitChunks: {
      chunks: "all", // 自动提取所有公共模块到单独 bundle
    },
  },
};
