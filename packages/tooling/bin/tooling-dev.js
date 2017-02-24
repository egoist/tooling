const chalk = require('chalk')
const webpack = require('webpack')
const getConfig = require('../lib')
const createServer = require('../lib/server')

module.exports = function (options) {
  const webpackConfig = getConfig(options)

  let compiler
  try {
    compiler = webpack(webpackConfig)
  } catch (err) {
    if (err.name === 'WebpackOptionsValidationError') {
      console.log(chalk.red(err.message))
    } else {
      console.error(err)
    }
    process.exit(1)
  }

  const {app} = createServer(compiler, options)

  app.listen(options.port)
}
