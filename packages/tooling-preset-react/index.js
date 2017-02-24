const path = require('path')

module.exports = function ({config, type, inherit, options}) {
  inherit('web', options)

  if (type === 'dev') {
    config
      .entry('web-client')
        .prepend(require.resolve('react-hot-loader/patch'))
        .end()
  }

  config
    .plugin('web-loader-options')
      .update(options => {
        options.options.babel = {
          presets: [require.resolve('babel-preset-react-app')],
          plugins: type === 'dev' ? [require.resolve('react-hot-loader/babel')] : []
        }
        return options
      })

  config.resolve
    .modules.add(path.join(__dirname, 'node_modules'))
}
