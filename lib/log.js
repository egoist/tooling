const chalk = require('chalk')

exports.error = msg => {
  console.error(`${chalk.bgRed.black(' ERROR ')} ${msg}\n`)
}

exports.success = msg => {
  console.log(`${chalk.bgGreen.black(' DONE ')} ${msg}\n`)
}
