const chalk = require('chalk')
const config = require('conpack')
const PostCompilePlugin = require('post-compile-webpack-plugin')

const presetOptions = {}

function loadPresets(presets, type) {
  for (const [name, presetOptions = {}] of presets) {
    console.log(chalk.bold(`> Using preset \`${name}\``))

    require(`tooling-preset-${name}`)({config, type, options: presetOptions})
  }
}

module.exports = function (options) {
  const presets = (options.presets || []).map(preset => {
    if (!Array.isArray(preset)) {
      return [preset, null]
    }
    return preset
  })

  loadPresets(presets, options.type)

  config
    .plugin('tooling-PostCompile')
      .use(PostCompilePlugin, stats => {
        process.stdout.write('\x1Bc')
        if (stats.hasErrors() && options.type === 'build') {
          console.log(stats.toString('errors-only'))
          process.exit(1)
        }
        console.log(stats.toString({
          children: false,
          modules: false,
          colors: true,
          chunks: false
        }))
        if (options.type === 'dev') {
          console.log(chalk.bold(`\n> Open http://localhost:${options.port}\n`))
        }
      })

  console.log()

  return config.toConfig()
}
