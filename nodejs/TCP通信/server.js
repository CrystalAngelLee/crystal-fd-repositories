/**
 * 在 nodejs 中可以通过 net 模块实现一个基于流的TCP通信
 * 依据内置的方法可以创建服务端和客户端
 * 监听具体的事件，当某些事件被触发的时候就可以利用相应的方法生产和消费数据
 */

const net = require('net')

// 创建服务端实例
const server = net.createServer()

const PORT = 3306,
  HOST = 'localhost'

// 开启服务
server.listen(PORT, HOST)

// 订阅事件
server.on('listening', () => {
  console.log(`服务端已经开启在 ${HOST}:${PORT}`)
})

// 接收消息 回写消息
server.on('connection', (socket) => {
  // socket 就是 netSocket 的实例
  socket.on('data', (chunk) => {
    const msg = chunk.toString()
    console.log(msg)

    // 回数据
    socket.write(Buffer.from(`hello ${msg}`))
  })
})

server.on('close', () => {
  console.log('服务端关闭了')
})

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log('地址正在被使用')
  } else {
    console.log(err)
  }
})
