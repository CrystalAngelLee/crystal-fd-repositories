const net = require('net')

// 创建服务端
const server = net.createServer()
server.listen(3306, () => {
  console.log('服务端启动了')
})

// 监听客户端请求
server.on('connection', (socket) => {
  socket.on('data', (data) => {
    // 获取到的客户端数据
    console.log(data.toString())
  })
  socket.end('test http request')
})
