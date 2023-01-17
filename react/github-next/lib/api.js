const axios = require('axios');

const github_base_url = 'https://api.github.com';

async function requestGithub(method, url, data, headers) {
  return await axios({
    method,
    url: `${github_base_url}${url}`,
    data,
    headers,
  });
}

const isServer = typeof window === 'undefined';
async function request({ method = 'GET', url, data = {} }, req, res) {
  if (!url) {
    throw Error('url must provide');
  }
  if (isServer) {
    const session = req.session;
    const githubAuth = (session && session.githubAuth) || {};
    const tocken = githubAuth && githubAuth.access_token;
    const headers = {};
    if (tocken) {
      headers[
        'Authorization'
      ] = `${githubAuth.token_type} ${githubAuth.access_token}`;
    }

    return await requestGithub(method, url, data, headers);
  } else {
    return await axios({
      method,
      url: `/github${url}`,
      data,
    });
  }
}

module.exports = {
  request,
  requestGithub,
};
