const GITHUB_OAUTH_URL = 'https://github.com/login/oauth/authorize';
const SCOPE = 'user';
const client_id = '1befd4f4f9d5255144d2';

module.exports = {
  github: {
    client_id,
    client_secret: '1194abcdab7861b5a3d5773b9ed6b4cb7571d224',
    request_token_url: 'https://github.com/login/oauth/access_token',
  },
  GITHUB_OAUTH_URL,
  OAUTH_URL: `${GITHUB_OAUTH_URL}?client_id=${client_id}&scope=${SCOPE}`,
};

// https://github.com/login/oauth/authorize?client_id=1befd4f4f9d5255144d2&scope=user&public_repo

// access_token=296a4471e7ce6c40dc2815f862a366ebccf66108
