#!/usr/bin/env node
'use strict'
const meow = require('meow')
const chalk = require('chalk')
const main = require('./')

const cli = meow(`
  ${chalk.bold('Usage:')}

  tooling <entry> --use ...

    -u/--use        Use a plugin
    -w/--watch      Watch mode, establish a server

    -v/--version    Print version
    -h/--help       Print help
`, {
  alias: {
    v: 'version',
    h: 'help',
    u: 'use',
    w: 'watch'
  }
})

main(cli)
  .catch(e => {
    console.log(e.stack)
  })
