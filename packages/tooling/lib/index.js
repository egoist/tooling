/* eslint-disable import/no-dynamic-require */

const chalk = require('chalk')
const config = require('conpack')
const PostCompilePlugin = require('post-compile-webpack-plugin')
const _ = require('./utils')

module.exports = function (options) {
  const presets = (options.presets || []).map(preset => {
    if (!Array.isArray(preset)) {
      return [preset, null]
    }
    return preset
  })

  for (const [name, presetOptions] of presets) {
    loadPreset(name, presetOptions)
    console.log(chalk.bold(`> Using preset \`${name}\``))
  }

  config
    .plugin('tooling-PostCompile')
      .use(PostCompilePlugin, stats => {
        process.stdout.write('\x1Bc')
        if (stats.hasErrors() && options.type === 'build') {
          throw new Error(stats.toString('errors-only'))
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

  function loadPreset(name, presetOptions) {
    const context = {
      config,
      type: options.type,
      options: presetOptions,
      inherit: loadPreset
    }

    require(_.cwd('node_modules', `tooling-preset-${name}`))(context)
  }
}
