'use strict'
const webpack = require('webpack')
const loadConfig = require('../lib/loadConfig')
const ProgressPlugin = require('../lib/ProgressPlugin')

module.exports = function build(options) {
  const config = loadConfig('build', options)
  config.plugins.push(new ProgressPlugin())
  webpack(config, (err, stats) => {
    if (err) {
      console.log(err)
    } else {
      console.log(stats.toString({
        colors: true,
        chunks: false
      }))
    }
  })
}
