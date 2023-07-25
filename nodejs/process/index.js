const cp = require('node:child_process')
const path = require('path')

/* 异步方法使用 */
// 执行 shell 脚本
// cp.exec('ls -al', (error, stdout, stderr) => {
//   console.log('error:执行语句异常', error)
//   console.log('stdout:正常输出结果', stdout)
//   console.log('stderr:异常执行输出结果', stderr)
// })

// 执行文件
// NODE命令在执行的时候，当前目录会动态变化 __dirname 可以帮助我们定位到当前源码所在的路径
// cp.execFile('ls', ['-al'], (error, stdout, stderr) => {
//   console.log('error:执行语句异常', error)
//   console.log('stdout:正常输出结果', stdout)
//   console.log('stderr:异常执行输出结果', stderr)
// })

// 执行耗时任务 比如 npm install
// const ls = cp.spawn('ls', ['-lh', '/usr'])
// ls.stdout.on('data', (data) => {
//   console.log(`stdout: ${data}`)
// })

// ls.stderr.on('data', (data) => {
//   console.error(`stderr: ${data}`)
// })

// ls.on('close', (code) => {
//   console.log(`child process exited with code ${code}`)
// })

// fork 使用 node 执行命令
// const child = cp.fork(path.resolve(__dirname, 'child.js'))
// // 向子进程发送消息
// child.send('hello child', () => {
//   // 断开连接
//   //   child.disconnect()
// })
// child.on('message', (msg) => {
//   console.log('11', msg)
// })
// console.log('main pid:', process.pid)

/* 同步方法使用 */
// console.log(cp.execSync('ls -al').toString())
// console.log(cp.execFileSync('ls', ['-al']).toString())
console.log(cp.spawnSync('ls', ['-al']))
