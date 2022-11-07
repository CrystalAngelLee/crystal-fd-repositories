const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')
const mime = require('mime')

const server = http.createServer((req, res) => {
  // 1 路径处理
  let { pathname } = url.parse(req.url)
  pathname = decodeURIComponent(pathname)

  let absPath = path.join(__dirname, pathname)
  // 2 目标资源状态处理
  fs.stat(absPath, (err, statObj) => {
    if (err) {
      res.statusCode = 404
      res.end('Not Found')
      return
    }

    if (statObj.isFile()) {
      // 路径对应的目标是一个文件，直接读取然后回写
      fs.readFile(absPath, (err, data) => {
        res.setHeader('Content-type', mime.getType(absPath) + ';charset=utf-8')
        res.end(data)
      })
    } else {
      // 路径对应的目标是一个文件夹
      fs.readFile(path.join(absPath, 'index.html'), (err, data) => {
        res.setHeader('Content-type', mime.getType(absPath) + ';charset=utf-8')
        res.end(data)
      })
    }
  })
})

server.listen(3306, () => {
  console.log('server is running')
})
