const webpack = require('webpack')

const webpackConfig = require('./webpack.config.base')

module.exports = Object.assign({}, webpackConfig, {
  plugins: [
    ...webpackConfig.plugins,
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
})
