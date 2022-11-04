const net = require('net')
const Transform = require('../数据封包拆包/transform')

// 创建服务端实例
const server = net.createServer()

// 剩余未处理的数据
let overageBuffer = null
const ts = new Transform()

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
    if (overageBuffer) {
      chunk = Buffer.concat([overageBuffer, chunk])
    }
    let packageLen = 0
    while ((packageLen = ts.getPackageLen(chunk))) {
      const packageCon = chunk.slice(0, packageLen)
      chunk = chunk.slice(packageLen)

      const ret = ts.decode(packageCon)
      console.log(ret)

      // 回数据
      socket.write(ts.encode(ret.body, ret.serialNum))
    }
    overageBuffer = chunk
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
