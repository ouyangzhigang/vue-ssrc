const webpack = require('webpack');
const { merge } = require('webpack-merge');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const Common = require('./webpack.common');
const { Resolve } = require('./utils');

module.exports = merge(Common, {
  target: 'web',
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: Resolve('client/client_entry.js'),
  // entry: Resolve('client/index.js'),  
  output: {
    filename: '[name].[hash:8].js',
    path: Resolve('dist'),
    publicPath: 'http://127.0.0.1:8899/dist/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.styl(us)?$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'stylus-loader'
        ]
      }
    ]
  },
  plugins: [
    new VueSSRClientPlugin(),
    new webpack.ProgressPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: Resolve('index.html')
    })
  ],
  devServer: {
    headers: {'Access-Control-Allow-Origin': '*'},
    hot: true,
    port: 8899,
    overlay: {errors: true},
    quiet: false
  }
});