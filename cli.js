#!/usr/bin/env node
'use strict'
const meow = require('meow')
const main = require('./lib')

const cli = meow(`
  Usage:
    tooling [entry1] [entry2] ...

  Example:
    tooling example/main.js --open
    tooling src/index.js -p

  Options:
    -p, --production:  Production mode, minify and optimize code
    -w, --watch:       Watch mode, run in webpack watch mode
    -l, --live:        Live reloading
    -o, --open:        Open dev server in default browser
    --no-html:         Do not generate html
    -v, --version:     Output version
    -h, --help:        Output help (You are here!)
`, {
  alias: {
    p: 'production',
    w: 'watch',
    l: 'live',
    v: 'version',
    h: 'help',
    o: 'open'
  }
})

const options = cli.flags
options.entry = cli.input.length > 0 ? cli.input : ['index.js']

main(options)
