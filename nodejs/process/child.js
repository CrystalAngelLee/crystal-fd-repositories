console.log('child process')
console.log('child pid', process.pid)

// 接收 主进程发送的数据
process.on('message', (msg) => {
  console.log('msg', msg)
})

// 向主进程发送消息
process.send('hello main')
