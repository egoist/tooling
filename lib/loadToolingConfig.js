'use strict'

module.exports = function () {
	try {
		const pkg = require(process.cwd() + '/package.json')
		return pkg.tooling || {}
	} catch (_) {
		return {}
	}
}
