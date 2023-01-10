const webpack = require('webpack');
const config = require('./config');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');

module.exports = withBundleAnalyzer({
  webpack(config) {
    config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));
    return config;
  },
  publicRuntimeConfig: {
    GITHUB_OAUTH_URL: config.GITHUB_OAUTH_URL,
    OAUTH_URL: config.OAUTH_URL,
  },
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../bundles/server.html',
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../bundles/client.html',
    },
  },
});
