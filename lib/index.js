'use strict'
const webpackConfig = require('./webpack-config')
const runWebpack = require('./run-webpack')
const runServer = require('./run-server')

module.exports = function (options) {
  const opts = Object.assign({}, {
    port: 4567,
    dist: 'build'
  }, options)
  const config = webpackConfig(opts)

  if (options.production) {
    runWebpack(config, opts)
  } else {
    runServer(config, opts)
  }
}
