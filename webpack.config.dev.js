const webpack = require('webpack')

const webpackConfig = require('./webpack.config.base')

webpackConfig.plugins.push(
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development')
  })
)

module.exports = webpackConfig
