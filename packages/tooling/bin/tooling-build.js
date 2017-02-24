/* eslint-disable unicorn/no-process-exit */
process.env.NODE_ENV = 'production'

const webpack = require('webpack')
const getConfig = require('../lib')

module.exports = function (options) {
  const webpackConfig = getConfig(options)

  const compiler = webpack(webpackConfig)

  compiler.run(() => {})
}
