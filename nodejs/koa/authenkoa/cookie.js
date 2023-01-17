// Cookie 源码实现
const http = require('http')
const session = {}
http.createServer(function (req, res) {
    const sessionKey = 'sid'
    if (req.url === '/favicon.ico') {
        return
    } else {
        console.log('cookie', req.headers.cookie);
        const cookie = req.headers.cookie
        // 已经登陆了
        if (cookie && cookie.indexOf(sessionKey) > -1) {
            res.end('Come Back')
            console.log('cookie:', req.headers.cookie);
            const pattern = new RegExp(`${sessionKey}=([^;]+);?\s*`)
            const sid = pattern.exec(cookie)[1]
            console.log('session:', sid, session, session[sid])
        } else { // 没有登录
            const sid = (Math.random() * 99999).toFixed()
            res.setHeader('set-cookie', `${sessionKey}=${sid}`)
            session[sid] = {name: 'crystal'}
            res.end('hello world')
        }
    }
})
.listen(3000)