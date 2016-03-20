'use strict'
const fs = require('fs')
const path = require('path')
const babel = require('babel-core')
const deepAssign = require('deep-assign')
const requireFromString = require('require-from-string')

module.exports = function assignConfig(toolingFile, config, options) {
  // require local tooling.js
  let code = babel.transform(fs.readFileSync(toolingFile, 'utf8'), {
    presets: ['es2015', 'stage-0']
  }).code
  code = requireFromString(code, {
    prependPaths: [
      path.join(__dirname, '../node_modules')
    ]
  })
  if (code.default) {
    code.default(config, options)
  }
}
