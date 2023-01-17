const axios = require('axios');
const { requestGithub } = require('../lib/api');
const github_base_url = 'https://api.github.com';

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
        {},
        headers
      );
      ctx.status = result.status;
      ctx.body = result.data;
    } else {
      await next();
    }
  });
};

// module.exports = (server) => {
//   server.use(async (ctx, next) => {
//     const path = ctx.path;
//     if (path.startsWith('/github/')) {
//       const githubAuth = ctx.session.githubAuth;
//       const githubPath = `${github_base_url}${ctx.url.replace(
//         '/github/',
//         '/'
//       )}`;

//       const tocken = githubAuth && githubAuth.access_token;

//       let headers = {};
//       if (tocken) {
//         headers['Authorization'] = `${githubAuth.token_type} ${tocken}`;
//       }
//       try {
//         const result = await axios({
//           method: 'GET',
//           url: githubPath,
//           headers,
//         });
//         if (result.status === 200) {
//           ctx.body = result.data;
//           ctx.set('Content-Type', 'application/json');
//         } else {
//           ctx.status = result.status;
//           ctx.body = {
//             success: false,
//           };
//           ctx.set('Content-Type', 'application/json');
//         }
//       } catch (err) {
//         ctx.body = {
//           success: false,
//         };
//         ctx.set('Content-Type', 'application/json');
//         console.error(err);
//       }
//     } else {
//       await next();
//     }
//   });
// };
