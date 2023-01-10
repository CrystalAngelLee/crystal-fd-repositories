const Koa = require('koa')
const app = new Koa()
const mongoose = require("./models/mongoose");
const getVip = require("./middleware/getVip")

/********  Session  *********/
const session = require('koa-session');
app.keys = ['some secrect']

const SESSION_CONDIG = {
    key: 'crystal: session'
}

app.use(session(SESSION_CONDIG, app))

const bodyParser = require('koa-bodyparser')
app.use(bodyParser())

/********  KOA 的时间处理  *********/

// 响应时间输出中间件
app.use(async (ctx, next) => {
    await next();
    // 获取响应头，印证执行顺序
    const rt = ctx.response.get('X-Response-Time');
    console.log(`输出计时：${ctx.method} ${ctx.url} - ${rt}`);
});

// 响应时间统计中间件
app.use(async (ctx, next) => {
    const start = Date.now();
    console.log('开始计时');
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
    console.log('计时结束');
});

// const sleep = time => new Promise(resolve => setTimeout(resolve, time))

// 响应
// app.use(async ctx => {
//     // await sleep(1000)  // 延时
//     ctx.status = 200
//     ctx.type = 'html'
//     ctx.body = '<h1>Hello Koa</h1>'
// })

/********  KOA 的错误处理  *********/

// 错误处理
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (error) {
        // 响应用户
        ctx.status = error.statusCode || error.status || 500;
        ctx.body = error.message;

        // 触发应用层级错误事件
        ctx.app.emit("error", error, ctx); // 遇到错误自行处理解决，不会终止服务
        console.log('中间件捕获到错误：', error.message);
    }
});

/********  Demo  *********/

app.use(getVip)

/********  KOA 静态文件服务  *********/

const static = require('koa-static')
app.use(static(__dirname + '/public'))

/********  模板引擎  *********/

const hbs = require('koa-hbs')
const helper = require('./utils/helpers.js')
app.use(hbs.middleware({
    viewPath: __dirname + '/views', //视图根目录
    defaultLayout: 'layout', //默认布局页面
    partialsPath: __dirname + '/views/partials', //注册partial目录
    disableCache: true //开发阶段不缓存
}));

/********  KOA 路由  *********/

const index = require('./routes/index')
const users = require('./routes/users')
app.use(index.routes())
app.use(users.routes())

app.on('error', (err, ctx) =>{
    console.error(err); // 只是打印错误，不会终止服务
    // console.log('没得事')
    // throw err  // 错误再往上抛--重大err的时候会导致程序终止
})

//开始监听端口，等同于http.createServer(app.callback()).listen(3000);
app.listen(3000);