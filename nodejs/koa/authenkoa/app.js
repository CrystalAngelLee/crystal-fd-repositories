const koa = require('koa');
const app = new koa();
const session = require('koa-session');

const redisStore = require('koa-redis')
const redis = require('redis')
const redisClient = redis.createClient(6379, 'localhost')

const wrapper = require('co-redis')
const client = wrapper(redisClient)

app.keys = ['some secrect']

const SESSION_CONDIG = {
    key: 'crystal: session',
    // maxAge: 8640000, // 有效期
    // httpOnly: true, // 服务器有效
    // signature: true, // 签名
    store: redisStore({ client })
}

app.use(session(SESSION_CONDIG, app))

app.use(ctx => {
    // 查看redis
    redisClient.keys('*', (err, keys) => {
        console.log('keys:', keys);
        keys.forEach(key => {
            redisClient.get(key, (err, data) => {
                console.log(data);
                
            })
        })
    })
    if (ctx.path === '/favicon.ico') return
    let n = ctx.session.count || 0;
    ctx.session.count = ++n;
    ctx.body = `第${n}次访问`
})

app.listen(3000)