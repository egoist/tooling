const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const install = require('yarn-install')
const series = require('promise.series')
const cmd = require('./cmd')

const packages = fs.readdirSync('packages')

function installDeps() {
  packages.forEach(name => {
    console.log(chalk.green(`\n> Install dependencies for \`${name}\`\n`))
    install({cwd: path.resolve('packages', name)})
  })

  link()
}

function link() {
  const actions = []

  for (const name of packages) {
    const dir = path.resolve('packages', name)
    actions.push(() => {
      console.log(chalk.green(`> Linking ${dir} to ${name}`))
      // link pkg
      return cmd('yarn', ['link'], {cwd: dir})
        .then(() => {
          return series(packages.filter(n => n !== name).map(n => () => {
            const dir = path.resolve('packages', n)
            console.log(chalk.green(`Linking ${name} in ${dir}`))
            return cmd('yarn', ['link', name], {cwd: dir})
          }))
        })
    })
  }

  series(actions).then(() => {
    console.log('All linked!')
  }).catch(err => {
    console.error(err)
    process.exit(1)
  })
}

installDeps()
