var path = require('path')

module.exports = {
  entry: './assets/scripts/index.js',
  output: {
    path: path.join(__dirname, '/build/'),
    filename: 'bundle.js'
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    alias: {
      solid: 'solid-client/dist/solid.min.js',
      spectre: 'spectre.css/dist/spectre.min.css'
    }
  },
  module: {
    loaders: [
      { // babel-loader
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      { // handlebars-loader
        test: /\.handlebars$/,
        loader: 'handlebars-loader'
      }
    ]
  },
  node: {
    fs: 'empty'
  },
  devtool: 'source-map'
}
