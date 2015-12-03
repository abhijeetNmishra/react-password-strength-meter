var path = require('path');
var webpack = require('webpack');
var nodeModulesPath = path.join(__dirname, 'node_modules');

module.exports = {
  entry: [
    // Set up an ES6-ish environment
    // Add your application's scripts below
    './main',
  ],
  output: {
    filename: 'main.js',
    path: path.join(__dirname, 'public'),
    publicPath: '/public/'
  },
  module: {
    loaders: [{
      loader: "babel-loader",

      exclude: nodeModulesPath,

      // Only run `.js` and `.jsx` files through Babel
      test: /\.jsx?$/,

      // Options to configure babel with
      query: {
        plugins: [],
        presets: ['es2015', 'react'],
      }
    },{ test: /\.css$/, loader: "style-loader!css-loader" }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.DedupePlugin()
  ]
}
