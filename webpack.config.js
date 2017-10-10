/*
    ./webpack.config.js
*/
const path = require('path');

module.exports = {
  entry: './src/app.jsx',
  output: {
    path: path.resolve('public'),
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      Components: path.resolve("src/components"),
      Styles: path.resolve("src/styles")
    }
  },
  module: {
    rules: [{
      loader:'babel-loader',
      query:{
        presets:['react','es2015','stage-0']
      },
      test:/\.jsx?$/,
      exclude:/(node_modules|bower_components)/
    }, {
      test: /\.css$/,
      use: [ 'style-loader', 'css-loader' ]
    }]
  }
}
