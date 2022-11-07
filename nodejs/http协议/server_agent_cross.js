const http = require('http')

const server = http.createServer((req, res) => {
  const arr = []
  req.on('data', (data) => arr.push(data))
  req.on('end', () => {
    res.end('this is content  & 测试')
  })
})

server.listen(3306, () => {
  console.log('server is running')
})
