var webpack = require('webpack');
var express = require('express');
var path = require('path');

var config = require('./webpack.dev.config');
var app = express();

var compiler = webpack(config);

var devMiddleWare = require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  //noInfo: true
  stats: {
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }
});
// for stable resources
app.use('/static', express.static(config.commonPath.staticDir));

// fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

app.use(devMiddleWare);
app.use(require('webpack-hot-middleware')(compiler));

var port = 3001;

app.listen(port, '127.0.0.1', function (err, result) {
  if(err){
    console.log(err);
  }
  console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
});