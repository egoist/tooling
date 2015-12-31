'use strict'

const path = require('path')
const webpack = require('webpack')
const loadConfig = require('../lib/loadConfig')

module.exports = function (options) {
	const config = loadConfig('build', options)
	webpack(config, (err, stats) => {
		if (err) {
			return console.log(err)
		}
		console.log(stats.toString({
			colors: true
		}))
	})
}
