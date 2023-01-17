const vip = require("../models/vip");

module.exports = async (ctx, next) => {
  if (ctx.accepts("html") === 'html') {
    console.log('vip.find()', vip.find())
    ctx.state.vipCourses = await vip.find();
  }

  await next();
};