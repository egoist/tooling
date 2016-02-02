'use strict'

const server = require('webpack-hot-server')
const loadConfig = require('../lib/loadConfig')
const open = require('open')

module.exports = function (options) {
	const config = loadConfig('watch', options)
	server({port: options.port, config})
		.then(port => {
			if (!options.silent) {
				open(`http://localhost:${port}`)
			}
		})
		.catch(err => console.log(err))
}
