var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var base = require('./webpack.config');

base.output.filename = '[name].js';
base.output.chunkFilename = '[id].js';
base.output.publicPath = '/';

base.entry = [
	base.entry.app,
	'webpack-hot-middleware/client'
];
base.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: base.commonPath.indexHTML,
    chunksSortMode: 'none'
  })
);

module.exports = base;