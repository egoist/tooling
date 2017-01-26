const fs = require('fs')
const path = require('path')

module.exports = function (defaultValue) {
  if (fs.existsSync('package.json')) {
    return require(path.join(process.cwd(), 'package.json'))
  }
  return typeof defaultValue === 'undefined' ? null : defaultValue
}
