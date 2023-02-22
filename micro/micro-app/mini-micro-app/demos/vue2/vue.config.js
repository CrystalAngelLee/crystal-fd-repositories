const path = require('path')
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, //关闭语法检查
  devServer: {
    port: 4000,
  },
  chainWebpack: (config) => {
    config.resolve.alias.set(
      'mini-micro-app',
      path.join(__dirname, '../../src/index.js')
    )
  },
})
