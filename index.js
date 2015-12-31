'use strict'

module.exports = function (type, options) {
	const validTypes = ['build', 'watch']
	if (validTypes.indexOf(type) < 0) {
		throw new Error('Unknown type, all valid types: ' + validTypes.toString())
	}

	require('./commands/' + type)(options)
}
