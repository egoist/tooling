const chalk = require('chalk')
const log = require('./log')

module.exports = function (err) {
  if (err.name === 'AppError') {
    console.log(chalk.red(err.message.trim()))
  } else {
    console.log(chalk.red(err.stack.trim()))
  }
  console.log()
  log.error('Compiling failed!')
  process.exit(1)
}
