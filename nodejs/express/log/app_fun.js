const express = require('express')

const app = express()

const myLogger = (req) => {
  console.log(req.method, req.url, Date.now())
}

app.use((req, res, next) => {
  console.log('hello')
  // res.send('hello')
  next()
})

// app.use((req, res, next) => {
//   req.foo = 'bar'
//   res.abc = () => {
//     console.log('abc')
//   }

//   console.log(req.method, req.url, Date.now())
//   // 交出执行权，往后继续匹配执行
//   next()
// })

// 中间件的顺序很重要
// req 请求对象
// res 响应对象
// next 下一个中间件
// app.use((req, res, next) => {
//   req.foo = 'bar'
//   res.abc = () => {
//     console.log('abc')
//   }

//   console.log(req.method, req.url, Date.now())
//   // 交出执行权，往后继续匹配执行
//   next()
// })

// function json (options) {
//   return (req, res, next) => {
//     console.log(`hello ${options.message}`)
//   }
// }

// app.use(json({
//   message: 'world'
// }))

// function fn (req, res, next) {}
// app.use(fn)

// req.body 获取请求体
// app.use(express.json())
// app.use(express.urlencoded())

app.get('/', (req, res, next) => {
  console.log(req.foo)
  res.send('get /')
  next()
})

app.get('/about', (req, res) => {
  // res.abc()
  res.send('get /about')
})

app.post('/login', (req, res) => {
  console.log(req.foo)
  res.abc()
  res.send('post /login')
})

// const myLogger = (req) => {
//   console.log(req.method, req.url, Date.now())
// }

// app.get('/', (req, res) => {
//   myLogger(req)
//   res.send('get /')
// })

// app.get('/about', (req, res) => {
//   myLogger(req)
//   res.send('get /about')
// })

// app.post('/login', (req, res) => {
//   myLogger(req)
//   res.send('post /login')
// })

// app.get('/', (req, res) => {
//   console.log(req.method, req.url, Date.now())
//   res.send('get /')
// })

// app.get('/about', (req, res) => {
//   console.log(req.method, req.url, Date.now())
//   res.send('get /about')
// })

// app.post('/login', (req, res) => {
//   console.log(req.method, req.url, Date.now())
//   res.send('post /login')
// })

app.listen(3000, () => {
  console.log(`Server running at http://localhost:3000/`)
})
