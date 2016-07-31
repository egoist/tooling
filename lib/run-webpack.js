'use strict'
const webpack = require('webpack')

module.exports = function (config, options) {
  const compiler = webpack(config)

  const cb = (err, stats) => {
    if (err) {
      return console.log(err)
    }
    console.log(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }))
  }

  if (options.watch) {
    compiler.watch({}, cb)
  } else {
    compiler.run(cb)
  }
}
