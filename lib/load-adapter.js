const path = require('path')

module.exports = function (adapter) {
  if (!adapter) {
    return
  }
  if (/\.js$/.test(adapter)) {
    return require(
      path.resolve(process.cwd(), adapter)
    )
  }
  return require(
    path.join(process.cwd(), 'node_modules', `tooling-${adapter}`)
  )
}
