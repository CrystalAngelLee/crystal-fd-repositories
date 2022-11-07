// 代理客户端
const http = require('http')

const PATH = '/?a=1'

// 发送get请求
// http.get(
//   {
//     host: 'localhost',
//     port: 3306,
//     path: PATH,
//   },
//   (res) => {}
// )

// 发送 post 请求
const options = {
  host: 'localhost',
  port: 3306,
  path: PATH,
  method: 'POST',
  headers: {
    // 'Content-type': 'application/json',
    'Content-type': 'application/x-www-form-unlencoded',
  },
}

const req = http.request(options, (res) => {
  const arr = []
  res.on('data', (data) => {
    arr.push(data)
  })
  res.on('end', () => {
    const obj = Buffer.concat(arr).toString()
    console.log(obj)
  })
})

// req.end('hello 中国')
// req.end('{"name": "China"}')
req.end('a=1&b=2')
