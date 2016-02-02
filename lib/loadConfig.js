'use strict'

/**
 * Module dependencies
 */
const objectString = require('object-string')

module.exports = function (type, options) {
	const use = options.use || 'vue'
	const config = require(`./webpack.config.${use}`)(type, options)
	return config
}
