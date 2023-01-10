const next = require('next');
const Koa = require('koa');
const Router = require('koa-router');
const session = require('koa-session');
const Redis = require('ioredis');
const KoaBody = require('koa-body');

// initialize redisStore
const RedisSessionStore = require('./src/sessionStore');

// AUTH
const OAuth = require('./src/auth');
// GitHub Request
const Api = require('./src/api');

// global
const atob = require('atob');

// initialize nextjs instance and expose requese handler
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handler = nextApp.getRequestHandler();

// redis server
const redis = new Redis({ port: 6381 });

// global atob function
global.atob = atob;

(async () => {
  try {
    await nextApp.prepare();
    const server = new Koa();
    const router = new Router();

    // koa-session
    server.keys = ['koa keys'];
    const CONFIG = {
      key: 'koaConfig',
      store: new RedisSessionStore(redis),
    };
    server.use(session(CONFIG, server));
    server.use(KoaBody());

    // 配置处理github OAuth 的登录
    OAuth(server);
    Api(server);

    // routes

    server.use(router.routes());

    // server.use(async (ctx, next) => {
    //   await handler(ctx.req, ctx.res);
    // });

    // use session
    server.use(async (ctx, next) => {
      ctx.req.session = ctx.session;
      await handler(ctx.req, ctx.res);
      ctx.respond = false;
    });

    // server.use(async (ctx, next) => {
    //   ctx.res.statusCode = 200;
    //   await next();
    // });

    server.listen(
      3001,
      (_) => console && console.log('koa server listening on 3001')
    );
  } catch (e) {
    console && console.error(e);
  }
})();
