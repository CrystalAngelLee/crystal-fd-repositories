const { overrideDevServer } = require('customize-cra')
module.exports = {
  devServer: overrideDevServer((config) => {
    return {
      ...config,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }
  }),
}
