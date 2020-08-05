const webpack = require('webpack');
const { merge } = require('webpack-merge');
const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const Common = require('./webpack.common');
const Package = require('../package.json');

module.exports = merge(Common, {
  target: 'node',
  mode: 'production',
  devtool: 'source-map',
  entry: path.resolve(__dirname, '../client/server_entry.js'),
  output: {
    filename: 'server_bundle.js',
    libraryTarget: 'commonjs2',
    publicPath: '/dist/',
    path: path.resolve(__dirname, '../server-build')
  },
  externals: Object.keys(Package.dependencies),
  module: {
    rules: [{
      test: /\.css$/i,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader'
      ]
    }, {
      test: /\.styl(us)?$/i,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'stylus-loader'
      ]
    }]
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      'process.env': {
        NODE_EVN: 'development',
        NODE_VUE: 'server',
        VERSION: Package.version
      }
    }),
    new VueSSRServerPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    })
  ]
});