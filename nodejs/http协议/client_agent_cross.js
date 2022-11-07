const http = require('http')

const options = {
  host: 'localhost',
  port: 3306,
  path: '/',
  method: 'POST',
}

const server = http.createServer((request, response) => {
  const req = http.request(options, (res) => {
    const arr = []
    res.on('data', (data) => {
      arr.push(data)
    })
    res.on('end', () => {
      const obj = Buffer.concat(arr).toString()
      response.setHeader('Content-type', 'text/html;charset=utf-8')
      response.end(obj)
    })
  })
  req.end('test 测试')
})
server.listen(3307, () => {
  console.log('代理服务端启动')
})
