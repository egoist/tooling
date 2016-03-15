'use strict'
/**
 * Return webpack config object
 *
 * @param {String} type - either build or watch
 * @param {Object} options - cli options, like --port
 * @returns
 */
module.exports = function reactConfig(type, options) {
  // require base config
  const config = require('./webpack.config.base')(type, options)
  // Babel presets for react(jsx)
  config.babel.presets.push(require('babel-preset-react'))
  // Resolve .jsx extensions
  config.resolve.extensions.push('.jsx')

  if (type === 'watch') {
    // configs only for watch mode
    // hmr presets
    config.babel.env = {
      development: {
        presets: [require('babel-preset-react-hmre')]
      }
    }
  } else if (type === 'build') {
    // configs only for build mode
  }
  return config
}
