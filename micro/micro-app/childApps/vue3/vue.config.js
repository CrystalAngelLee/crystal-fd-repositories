const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, //关闭语法检查
  devServer: {
    port: 3312,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
})
