const http = require('http')
const url = require('url')

// 创建服务端
const server = http.createServer((req, res) => {
  // 针对于请求和响应完成各自的操作
  // 请求路径-使用url模块将请求路径和请求参数分开
  const { pathname, query } = url.parse(req.url, true)
  console.log('req.url', pathname, query)

  // 请求方式
  console.log(req.method)

  // 协议版本号
  console.log(req.httpVersion)

  /* 请求头 */
  // console.log(req.headers)

  /**
   * 请求体数据获取
   * 可以通过 curl 工具进行模拟发送
   * curl -v -X POST -d "'name': 'test'" http://localhost:3306/
   */
  /* const arr = []
  req.on('data', (data) => {
    arr.push(data)
  })
  req.on('end', () => {
    console.log(Buffer.concat(arr).toString())
  }) */

  /* 设置响应 */
  // 设置状态码
  res.statusCode = 302
  // 设置响应头
  res.setHeader('Content-type', 'text/html;charset=utf-8')
  res.end('test ok & 中文测试')
})

server.listen(3306, () => {
  console.log('http server is running')
})
