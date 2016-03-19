'use strict'
const co = require('co')
const readPkg = require('read-pkg-up')
const globalNodeModules = require('global-node-modules')
const npmin = require('npmin')

module.exports = co.wrap(function* (cli) {
  // get entry from first arg or `entry` flag
  const entry = cli.input[0] || cli.flags.entry
  // get plugins
  if (!cli.flags.use) {
    throw new Error('Require plugins')
  }
  const plugins = Array.isArray(cli.flags.use) ? cli.flags.use : [cli.flags.use]
  // get package.json in cwd
  const localPkg = yield readPkg()
  const self = {
    entry,
    output: cli.output,
    flags: cli.flags,
    pkg: localPkg,
    tooling: cli.pkg
  }
  // install the plugins globally
  npmin(plugins.map(name => `tooling-plugin-${name}`), {
    global: true
  })
  // run runner
  const runner = require(globalNodeModules(plugins[0]))
  runner.call(self)
})
