const { requestGithub } = require('../lib/api');

module.exports = (server) => {
  server.use(async (ctx, next) => {
    const path = ctx.path;
    const method = ctx.method;
    if (path.startsWith('/github/')) {
      const session = ctx.session;
      const githubAuth = session && session.githubAuth;
      const tocken = githubAuth && githubAuth.access_token;

      let headers = {};
      if (tocken) {
        headers[
          'Authorization'
        ] = `${githubAuth.token_type} ${githubAuth.access_token}`;
      }

      const result = await requestGithub(
        method,
        ctx.url.replace('/github/', '/'),
        ctx.request.body || {},
        headers
      );
      ctx.status = result.status;
      ctx.body = result.data;
    } else {
      await next();
    }
  });
};
