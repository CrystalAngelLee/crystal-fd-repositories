const GITHUB_OAUTH_URL = 'https://github.com/login/oauth/authorize';
const SCOPE = 'user';
const client_id = '1befd4f4f9d5255144d2';

module.exports = {
  github: {
    client_id,
    client_secret: 'b78f9097cd0d4c13ccd3d6446e916cbb2895fd9b',
    request_token_url: 'https://github.com/login/oauth/access_token',
  },
  GITHUB_OAUTH_URL,
  OAUTH_URL: `${GITHUB_OAUTH_URL}?client_id=${client_id}&scope=${SCOPE}`,
};
