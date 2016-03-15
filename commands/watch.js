'use strict'
const opn = require('opn')
const server = require('webpack-hot-server')
const loadConfig = require('../lib/loadConfig')

module.exports = function watch(options) {
  const config = loadConfig('watch', options)
  server({ config, port: options.port, customIndex: true })
    .then(port => {
      if (!options.silent) {
        opn(`http://localhost:${port}`)
      }
    })
    .catch(err => console.log(err))
}
