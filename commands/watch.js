'use strict'

const path = require('path')
const webpack = require('webpack')
const server = require('../lib/server')
const loadConfig = require('../lib/loadConfig')

module.exports = function (options) {
	const config = loadConfig(options)
	config.debug = true
	config.entry.push('webpack-hot-middleware/client')
	config.devtool = 'cheap-module-eval-source-map'
	config.plugins = [
	  new webpack.HotModuleReplacementPlugin(),
	  new webpack.NoErrorsPlugin(),
	  new webpack.DefinePlugin({
	    '__DEV__': true,
	    'process.env': JSON.stringify('development')
	  })
	]
	server(config)
}
