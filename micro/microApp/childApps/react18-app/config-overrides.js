const {
  override,
  addPostcssPlugins,
  fixBabelImports,
  overrideDevServer,
} = require('customize-cra')

const devServerConfig = () => (config) => {
  return {
    ...config,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  }
}

module.exports = {
  devServer: overrideDevServer(devServerConfig()),
}
