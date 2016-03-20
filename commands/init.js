'use strict'
const fs = require('fs')
const cwd = require('cwd')
const chalk = require('chalk')
const pkg = require('update-pkg')
const stripIndent = require('strip-indent')
const pathExists = require('path-exists')

module.exports = function init(type) {
  const use = type || 'base'
  try {
    // update npm scripts in package.json
    const data = pkg.data()
    data.scripts.build = `tooling build -u ${use}`
    data.scripts.watch = `tooling watch -u ${use}`
    data.scripts.deploy = 'npm run build && gh-pages -d build'
    pkg.update(data)
    // initial a tooling.js
    const toolingFile = cwd('tooling.js')
    if (pathExists.sync(toolingFile)) {
      console.log(chalk.red('tooling.js already exists'))
      return
    }
    /* eslint-disable */
    const toolingConfig = stripIndent(`
        /**
         * @param {Object} config - webpack config which merged cli options and settings in package.json
         * @param {Object} options - cli arguments
         * @return {Object} config - new webpack config
         */
        export default function (config, options) {
          // modify config can override everything defined via CLI and package.json
          // config.entry = './path/to/entry'
        }
    `).trim()
    /* eslint-enable */
    fs.writeFileSync(toolingFile, toolingConfig, 'utf8')
  } catch (e) {
    console.log(e.stack)
  }
}
