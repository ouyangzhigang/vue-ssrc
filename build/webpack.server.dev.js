const { merge } = require('webpack-merge');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const Common = require('./webpack.common.js');
const { Resolve } = require('./utils.js');
const Package = require('../package.json');

module.exports = merge(Common, {
  target: 'node',
  mode: 'development',
  entry: Resolve('client/server_entry.js'),
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server_entry.js',
    path: Resolve('server-build')
  },
  devtool: 'source-map',
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
