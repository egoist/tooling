'use strict'
const cwd = require('cwd')
const pathExists = require('path-exists')
const assignConfig = require('./assignConfig')

module.exports = function loadConfig(type, options) {
  const use = options.use || 'vue'
  let config = require(`./webpack.config.${use}`)(type, options)

  // assing tooling.js
  const toolingFile = cwd(options.config || 'tooling.js')
  if (pathExists.sync(toolingFile)) {
    config = assignConfig(toolingFile, config, options)
  }

  return config
}
