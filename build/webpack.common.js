const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const { Resolve } = require('./utils');

module.exports = {
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue: 'vue/dist/vue.esm.js',
      '@client': Resolve('client')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
        /** https://vue-loader.vuejs.org/zh/options.html#compiler */
      },
      {
        test: /\.(gif|png|jeg|jpeg|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          name: 'resource/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}