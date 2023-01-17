const http = require('http');
const fs = require('fs');

http
    .createServer((req, res) => {
        const {url, method, headers} = req;
        console.log('method:', method)
        console.log('cookie', req.headers.cookie)
        if (url === '/' && method === 'GET') {
            fs.readFile('../public/node_index.html', (err, data) => {
                if (err) {
                    res.writeHead(500, {'Content-Type': 'text/plain;charset=utf-8'})
                    res.end('Server Error 服务器错误')
                }
                res.statusCode = 200
                res.setHeader("Content-Type", 'text/html')
                res.end(data)
            })
        } else if (url === '/users' && method === 'GET') {
            res.setHeader('Content-Type', 'application/json')
            setHeader(res)
            res.end(JSON.stringify({name: 'crystal', age: 18}))
        } else if (method == "OPTIONS" && url == "/users") { // 预检请求
            setHeader(res);
            res.end();
        }
    })
    .listen(3000)

    function setHeader(res) {
        // 跨域
        res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8080')
        res.setHeader('Access-Control-Allow-Headers', 'X-Token,Content-Type')
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        // cookie
        res.setHeader('Set-Cookie', 'cookie1=1234;')
    }