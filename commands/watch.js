'use strict'

const path = require('path')
const webpack = require('webpack')
const server = require('../lib/server')
const loadConfig = require('../lib/loadConfig')
const open = require('open')

module.exports = function(options) {
	const config = loadConfig('watch', options)
	const port = config.port
	delete config.port
	server(port, config)
		.then(port => {
			if (!options.silent) {
				open(`http://localhost:${port}`)
			}
		})
}
