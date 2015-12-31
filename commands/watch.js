'use strict'

const path = require('path')
const webpack = require('webpack')
const server = require('../lib/server')
const loadConfig = require('../lib/loadConfig')
const open = require('open')

module.exports = function(options) {
	const config = loadConfig('watch', options)
	server(config, port => {
		if (!options.silent) {
			open(`http://localhost:${port}`)
		}
	})
}
