'use strict'

module.exports = function (type, options) {
	const use = options.use || 'vue'
	const config = require(`./webpack.config.${use}`)(type, options)
	return config
}
