/**
 * 在 nodejs 中可以通过 net 模块实现一个基于流的TCP通信
 * 依据内置的方法可以创建服务端和客户端
 * 监听具体的事件，当某些事件被触发的时候就可以利用相应的方法生产和消费数据
 */

const net = require('net')

// 创建客户端实例
const client = net.createConnection({ port: 3306, host: 'localhost' })

const dataArr = ['已连接1', '已连接2', '已连接3', '已连接4']

client.on('connect', () => {
  client.write('已连接0')
  // 数据粘包解决方案-拉长发送时间间隔
  for (let i = 0, len = dataArr.length; i < len; i++) {
    ;(function (val, index) {
      setTimeout(() => {
        client.write(val)
      }, 1000 * (index + 1))
    })(dataArr[i], i)
  }
})

client.on('data', (chunk) => {
  console.log(chunk.toString())
})

client.on('error', (err) => {
  console.log(err)
})

client.on('close', () => {
  console.log('客户端断开连接')
})
