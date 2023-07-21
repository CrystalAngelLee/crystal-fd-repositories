const path = require('path')

module.exports = {
  mode: 'development',
  entry: './transESModule/index.js',
  output: {
    filename: 'core.js',
    path: path.join(__dirname, '/dist'),
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              [
                '@babel/plugin-transform-runtime',
                {
                  corejs: 3,
                  regenerator: true,
                  useESModules: true,
                  helpers: true,
                },
              ],
            ],
          },
        },
      },
    ],
  },
}
