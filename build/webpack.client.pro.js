const webpack = require('webpack');
const { merge } = require('webpack-merge');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const Common = require('./webpack.common');
const { Resolve } = require('./utils');

module.exports = merge(Common, {
  target: 'web',
  mode: 'production',
  entry: {
    vendor: ['vue', 'vuex'],
    app: Resolve('client/client_entry.js')
  },
  output: {
    filename: '[name].[chunkhash:8].js',
    path: Resolve('dist'),
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.styl(us)?$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'stylus-loader'
        ]
      }
    ]
  },
  plugins: [
    new VueSSRClientPlugin(),
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: Resolve('index.html')
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    })
  ]
});