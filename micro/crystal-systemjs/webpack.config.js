const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "index.js",
        path: path.join(__dirname, "build"),
        // !!! 标记将 es module 转换成 system module
        libraryTarget: "system"
    },
    devtool: "source-map",
    devServer: {
        port: 9000,
        contentBase: path.join(__dirname, "build"),
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            // !!! 阻止 JS 文件的引入
            inject: false
        })
    ],
    // !!! 排除不需要打包的模块
    externals: ["react", "react-dom", "react-router-dom"]
}