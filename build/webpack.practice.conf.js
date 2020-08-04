const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: {
    // app: { import: path.join(__dirname, '../practice/index.js'), dependOn: 'vendor' },
    app: path.join(__dirname, '../practice/index.js'),
    vendor: ['vue']
  },
  output: {
    filename: '[name].[hash:9].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@client': path.join(__dirname, '../client'),
      vue: 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.stylus$/,
        use: ['vue-style-loader', 'css-loader', 'stylus-loader'],
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    port: 8899,
    open: true,
    hot: true
  },
  plugins: [
    new HtmlPlugin({
      template: path.join(__dirname, '../index.html')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin()
  ]
}