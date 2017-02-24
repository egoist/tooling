#!/usr/bin/env node
const meow = require('meow')
const chalk = require('chalk')
const loadConfig = require('cosmiconfig')

const {input, flags, pkg} = meow({
  help: false
}, {
  alias: {
    h: 'help',
    v: 'version'
  }
})

const cmd = input[0]

if (!cmd || flags.help) {
  showHelp()
}

loadConfig('tooling').load(process.cwd())
.then(result => {
  const filepath = result ? result.filepath : null
  const config = result ? result.config : {}

  let options = Object.assign({
    type: cmd,
    port: 4000
  }, config, flags)

  if (filepath) {
    console.log(chalk.bold(`> Using config from ${result.filepath}`))
  } else if (!options.presets) {
    console.error(chalk.red('> You should either use config file or set presets via command line, both are not found!'))
    process.exit(1)
  }

  if (typeof options.presets === 'string') {
    options.presets = [options.presets]
  }

  if (cmd === 'dev') {
    if (options.help) {
      console.log(`
  --port        Dev server port
      `)
      process.exit()
    }

    require('./tooling-dev')(options)
  } else if (cmd === 'build') {
    require('./tooling-build')(options)
  }
}).catch(err => {
  console.error(chalk.red(err.stack))
  process.exit(1)
})

function showHelp() {
  if (cmd === 'build') {
    console.log(`
  ${chalk.bold('Build app')}

  Command: ${chalk.yellow('tooling')} build [options]

  ${chalk.bold('Options:')}

    ${chalk.yellow('-h, --help')}            ${chalk.dim('Show help')}
    `)
  } else if (cmd === 'dev') {
    console.log(`
  ${chalk.bold('Develop app')}

  Command: ${chalk.yellow('tooling')} dev [options]

  ${chalk.bold('Options:')}

    ${chalk.yellow('--port <port>')}        ${chalk.dim('Use specific port for dev server')}
    ${chalk.yellow('--proxy <url>')}        ${chalk.dim('Proxy API requests to /api')}
    ${chalk.yellow('-h, --help')}           ${chalk.dim('Show help')}
    ${chalk.yellow('-v, --version')}        ${chalk.dim('Show version number')}
    `)
  } else {
    console.log(`
  ${chalk.bold(pkg.description)}

  ${chalk.bold('Commands:')}

    ${chalk.yellow('build')}                 ${chalk.dim('Build app')}
    ${chalk.yellow('dev')}                   ${chalk.dim('Develop app')}

  ${chalk.bold('Options:')}

    ${chalk.yellow('-h, --help')}            ${chalk.dim('Show help')}
    ${chalk.yellow('-v, --version')}         ${chalk.dim('Show version number')}
    `)
  }
  process.exit()
}
