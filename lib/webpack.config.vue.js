'use strict'

/**
 * Return webpack config object
 *
 * @param {String} type - either build or watch
 * @param {Object} options - cli options, like --port
 * @returns
 */
module.exports = function (type, options) {
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

	if (type === 'watch') {
		// configs only for watch mode
	} else if (type === 'build') {
		// configs only for build mode
	}
	return config
}
