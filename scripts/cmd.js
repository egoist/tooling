const {spawn} = require('child_process')

module.exports = function (bin, args, options) {
  return new Promise((resolve, reject) => {
    const proc = spawn(bin, args, Object.assign({
      stdio: 'inherit'
    }, options))
    proc.on('close', resolve)
    proc.on('error', reject)
  })
}
