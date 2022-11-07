const http = require('http')
const url = require('url')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url)
  console.log(pathname, query)

  const arr = []
  req.on('data', (data) => {
    arr.push(data)
  })
  req.on('end', () => {
    const obj = Buffer.concat(arr).toString()
    if (req.headers['content-type'] === 'application/json') {
      const a = JSON.parse(obj)
      a.add = 'SH'
      res.end(JSON.stringify(a))
    } else if (
      req.headers['content-type'] === 'application/x-www-form-unlencoded'
    ) {
      const ret = querystring.parse(obj)
      res.end(JSON.stringify(ret))
    }
  })
})

server.listen(3306, () => {
  console.log('server is running')
})
