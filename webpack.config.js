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
      spectre: 'spectre.css/dist/spectre.min.css'
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.handlebars$/,
        loader: 'handlebars'
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  node: {
    fs: 'empty'
  },
  externals: {
    xhr2: 'XMLHttpRequest',
    xmlhttprequest: 'XMLHttpRequest'
  },
  devtool: 'source-map'
}
