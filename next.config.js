const withCSS = require('@zeit/next-css');
const webpack = require('webpack');

const serverConfig = require('./server/config');

const apiKey = JSON.stringify(serverConfig.shopify.apiKey);
module.exports = withCSS({
  webpack: (config) => {
    const env = { API_KEY: apiKey };

    config.plugins.push(new webpack.DefinePlugin(env));
    return config;
  },
});
