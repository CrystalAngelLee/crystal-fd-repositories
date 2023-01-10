const express = require('express')
const server = express()
const { createBundleRenderer } = require('vue-server-renderer')

server.use('/dist', express.static('./dist'))

const isProd = process.env.NODE_ENV === 'production'
let renderer 
let onReady
if (isProd) {
  const serverBundle = require('./dist/vue-ssr-server-bundle.json')
  const template = require('fs').readFileSync('./index.template.html', 'utf-8')
  const clientManifest = require('./dist/vue-ssr-client-manifest.json')
  renderer = createBundleRenderer(serverBundle, {
    template,
    clientManifest
  })
} else {
  // 开发模式
  // 监视打包构建(客户端 + 服务端) -> 重新生成renderer渲染器
  onReady = setupDevServer(server, (serverBundle, template, clientManifest) => {
    renderer = createBundleRenderer(serverBundle, {
      template,
      clientManifest
    })
  })
}

const context = {
  title: 'VUE SSR',
  meta: `
    <meta name="keyword" content="vue,ssr">
  `
}

const render = (req, res) => {
  renderer.renderToString(context, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.setHeader('Content-Type', 'text/html; charset=utf8')
    res.end(html)
  })
}

server.get('*', isProd ? render : (req, res) => {
  // 等待有了 renderer 渲染器以后, 调用 render 进行渲染
  render()
})

server.listen(3306)