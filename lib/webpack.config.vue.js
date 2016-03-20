'use strict'
/**
 * Module dependencies
 */
const ExtractTextPlugin = require('extract-text-webpack-plugin')

/**
 * Return webpack config object
 *
 * @param {String} type - either build or watch
 * @param {Object} options - cli options, like --port
 * @returns
 */
module.exports = function vueConfig(type, options) {
  // require base config
  const config = require('./webpack.config.base')(type, options)
  // Resolve .vue extensions
  config.resolve.extensions.push('.vue')
  // Add vue loader
  config.module.loaders.push({
    test: /\.vue$/,
    loaders: ['vue']
  })
  config.vue = {
    loaders: {},
    postcss: config.postcss
  }
  let postcssLoader = options.cssmodules ?
    'css-loader?modules&importLoaders=1!postcss-loader' :
    'css-loader!postcss-loader'
  if (options.sugarss) {
    postcssLoader += '?parser=sugarss'
  }
  if (type === 'watch') {
    // configs only for watch mode
    config.vue.loaders.css = `style-loader!${postcssLoader}`
  } else if (type === 'build') {
    // configs only for build mode
    config.vue.loaders.css = ExtractTextPlugin.extract('style-loader', postcssLoader)
  }
  return config
}
