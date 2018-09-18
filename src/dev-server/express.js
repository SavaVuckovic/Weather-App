import express from 'express';
import path from 'path';

const server = express();

const webpack = require('webpack');
const config = require('../../config/webpack.dev.js');
const compiler = webpack(config);
const webpackDevMiddleware = require('webpack-dev-middleware')(
  compiler,
  config.devServer
);
server.use(webpackDevMiddleware);

const webpackHotMiddleware = require('webpack-hot-middleware')(compiler);
server.use(webpackHotMiddleware);

const staticMiddleware = express.static('dist');
server.use(staticMiddleware);

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`Development server started on port ${PORT}`));
