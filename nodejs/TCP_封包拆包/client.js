const net = require('net')
const Transform = require('../数据封包拆包/transform')

// 创建客户端实例
const client = net.createConnection({ port: 3306, host: 'localhost' })

let overageBuffer = null
const ts = new Transform()

client.on('connect', () => {
  client.write(ts.encode('已连接0'))
  client.write(ts.encode('已连接1'))
  client.write(ts.encode('已连接2'))
  client.write(ts.encode('已连接3'))
  client.write(ts.encode('已连接4'))
})

client.on('data', (chunk) => {
  if (overageBuffer) {
    chunk = Buffer.concat([overageBuffer, chunk])
  }
  let packageLen = 0
  while ((packageLen = ts.getPackageLen(chunk))) {
    const packageCon = chunk.slice(0, packageLen)
    chunk = chunk.slice(packageLen)

    const ret = ts.decode(packageCon)
    console.log(ret)
  }
  overageBuffer = chunk
})

client.on('error', (err) => {
  console.log(err)
})

client.on('close', () => {
  console.log('客户端断开连接')
})
