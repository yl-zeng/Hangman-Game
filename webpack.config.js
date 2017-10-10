/*
    ./webpack.config.js
*/
var webpack = require("webpack");
const path = require('path');

module.exports = {
  entry: [
    './src/app.jsx'
  ],
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
    rules: [{ test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
    {
      loader:'babel-loader',
      query:{
        presets:['react','es2015','stage-0']
      },
      test:/\.jsx?$/,
      exclude:/(node_modules|bower_components)/
    }, {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }, {
      test: /\.css$/,
      use: [ 'style-loader', 'css-loader' ]
    },{ test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
    { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }]
  }
}
