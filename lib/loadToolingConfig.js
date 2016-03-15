'use strict'
const cwd = require('cwd')

module.exports = function loadToolingConfig() {
  try {
    const pkg = require(cwd('package.json'))
    return pkg.tooling || {}
  } catch (_) {
    return {}
  }
}
