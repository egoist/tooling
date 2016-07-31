'use strict'
const webpack = require('webpack')
const server = require('webpack-hot-server')
const opn = require('opn')
const _ = require('./utils')

module.exports = function (config, options) {
  const port = options.port
  const app = server({
    config,
    webpack,
    port,
    customIndex: options.html === false ? false : _.cwd(options.dist || 'build')
  })

  app.listen(port, () => {
    console.log(`[tooling] Listening at http://localhost:${port}`)
  })

  if (options.open) {
    opn(`http://localhost:${port}`)
  }
}
