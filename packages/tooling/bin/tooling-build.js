/* eslint-disable unicorn/no-process-exit */

const webpack = require('webpack')
const getConfig = require('../lib')

module.exports = function (options) {
  const webpackConfig = getConfig(options)

  const compiler = webpack(webpackConfig)

  compiler.run(() => {})
}
