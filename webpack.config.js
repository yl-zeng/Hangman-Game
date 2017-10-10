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
  module: {
    loaders: [
      {
      loader:'babel-loader',
      query:{
        presets:['react','es2015','stage-0']
      },
      test:/\.jsx?$/,
      exclude:/(node_modules|bower_components)/
    }
    ]
  }
}
