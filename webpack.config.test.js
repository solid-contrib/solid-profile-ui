const webpack = require('webpack')

const webpackConfig = require('./webpack.config.base')

module.exports = Object.assign({}, webpackConfig, {
  plugins: [
    ...webpackConfig.plugins,
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('test')
    })
  ],
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  },
  devtool: 'inline-source-map'
})
