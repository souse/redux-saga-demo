var path = require('path');
var webpack = require('webpack');
var NyanProgressPlugin = require('nyan-progress-webpack-plugin');

var env = process.env.NODE_ENV.trim(); // 当前环境
var src = path.join(__dirname, 'src'); // 开发源码目录
var commonPath = {
  rootPath: __dirname,
  distPath: path.join(__dirname, 'dist'), // 输出目录
  indexHTML: path.join(__dirname, 'index.html'),
  staticDir: path.join(__dirname, 'static') 
};

module.exports = {
  devtool: 'source-map',
  commonPath: commonPath,
  entry: {
    app: path.join(src, 'main.js'),
    vendor: [
      'history',
      'lodash',
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
      'redux-thunk'
    ]
  },
  output: {
    path: path.join(commonPath.distPath, 'static'),
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      API: path.join(src, 'api'),
      ACTION: path.join(src, 'actions'),
      COMPONENT: path.join(src, 'components')
    }
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css?$/,
        loaders : [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less?$/,
        loaders : [
          'style-loader',
          'css-loader',
          'less-loader?{"sourceMap": true}'
        ],
        include: path.join(__dirname, 'src')
      },
      { test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'url',
        query: {
          limit: 10240,
          name: 'static/images/[sha512:hash:base64:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    new NyanProgressPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __DEV__: env === 'development',
      __PROD__: env === 'production'
    })
  ]
};
