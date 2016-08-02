#!/usr/bin/env node
'use strict'
const meow = require('meow')
const main = require('./lib')
const init = require('./lib/init')

const cli = meow({help: false}, {
  alias: {
    p: 'production',
    w: 'watch',
    l: 'live',
    v: 'version',
    h: 'help',
    o: 'open'
  }
})

if (cli.flags.help) {
  console.log(`
  ${cli.pkg.description}`)

  if (cli.input[0] === 'init') {
    console.log(`
  Usage:
    tooling init <projectName> [options]

  Options:
    --react:       Create React app
    `)
  } else {
    console.log(`
  Usage:
    tooling <entry1> [entry2] ...

  Example:
    tooling example/main.js --open
    tooling src/index.js -p

  Sub Commands:
    init:                Initialize a new project

  Options:
    -p, --production:    Production mode, minify and optimize code
    -w, --watch:         Watch mode, run in webpack watch mode
    -l, --live:          Live reloading
    -o, --open:          Open dev server in default browser
    --css-modules:       Enable CSS modules
    --react:             Use presets for React apps
    --no-html:           Do not generate html
    --umd <moduleName>:  Bundle in UMD format
    --cjs:               Bundle in CommonJS format
    -v, --version:       Output version
    -h, --help:          Output help (You are here!)
    `)
  }
  process.exit()
}

const options = cli.flags
const input = cli.input.length ? cli.input : ['index.js']

switch (input[0]) {
  case 'init':
    init(input[1], options)
    break
  default:
    options.entry = input
    main(options)
}
