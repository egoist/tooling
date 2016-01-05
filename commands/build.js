'use strict'

const path = require('path')
const webpack = require('webpack')
const loadConfig = require('../lib/loadConfig')
const ProgressPlugin = require('../lib/ProgressPlugin')

module.exports = function (options) {
	const config = loadConfig('build', options)
	config.plugins.push(new ProgressPlugin())
	webpack(config, (err, stats) => {
		if (err) {
			return console.log(err)
		}
		console.log(stats.toString({
			colors: true,
			chunks: false
		}))
	})
}
