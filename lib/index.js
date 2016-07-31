'use strict'
const co = require('co')
const System = require('systemjs')
const webpackConfig = require('./webpack-config')
const runWebpack = require('./run-webpack')
const runServer = require('./run-server')

module.exports = co.wrap(function * (options) {
  let userConfig = {}
  try {
    const userConfigFile = yield System.import('tooling.config.js')
    userConfig = userConfigFile.default(options) || userConfig
  } catch (err) {
    if (err.originalErr.code !== 'ENOENT') {
      console.log(err.stack)
    }
  }
  const opts = Object.assign({}, {
    port: 4567,
    dist: 'build'
  }, options, userConfig)
  const config = webpackConfig(opts)

  if (options.production) {
    runWebpack(config, opts)
  } else {
    runServer(config, opts)
  }
})
