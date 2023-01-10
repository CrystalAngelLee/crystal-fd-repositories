const Router = require('koa-router')
const router = new Router({ prefix: '/users' })
router.get('/', async ctx => {
    // ctx.body = 'user'
    await ctx.render("users", {
        title: "用户列表",
        subTitle: "handlebars语法",
        isShow: true,
        username: "jerry",
        htmlStr: `<h3>abc</h3>`,
        users: [
          { username: "tom", age: 20, birth: new Date(1999, 2, 2) },
          { username: "jerry", age: 20, birth: new Date(1999, 3, 2) }
        ]
    });
})

router.post('/login', async ctx => {
  const { body } = ctx.request
  console.log('body,', body);

  // 登录逻辑
  ctx.session.userinfo = body.username
  ctx.body = {
    ok: 1, 
    message: '登录成功'
  }
})

router.post('/logout', async (ctx) => {
  delete ctx.session.userinfo
  ctx.body = {
    ok: 1, 
    message: '退出系统'
  }
})

router.get('/getUser', async ctx => {
  ctx.body = {
    ok: 1,
    message: '获取成功', 
    userinfo: ctx.session.userinfo
  }
})

module.exports = router