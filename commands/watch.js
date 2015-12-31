'use strict'

const path = require('path')
const webpack = require('webpack')
const server = require('../lib/server')
const loadConfig = require('../lib/loadConfig')
const open = require('open')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = function(options) {
	const config = loadConfig(options)
	config.debug = true
	config.watch = true
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
	if (options.browsersync) {
		config.plugins.push(new BrowserSyncPlugin({
			proxy: `localhost:${config.port || 7888}`,
			files: [path.resolve(process.cwd(), 'build/**/*')],
			port: 23789
		}))
	}
	server(config, port => {
		if (!options.silent) {
			open(`http://localhost:${port}`)
		}
	})
}
