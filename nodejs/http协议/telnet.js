// socket 编程
const net = require('net')
// 建立tcp协议
const chatServer = net.createServer()
const clientList = []

// 建立连接
chatServer.on('connection', client => {
    client.write("hi\n")
    clientList.push(client)
    // 接受到消息
    client.on('data', data => {
        // 广播消息
        console.log('data', data.toString())
        clientList.forEach(v => {
            v.write(data)
        })
    })
})

chatServer.listen(9000)