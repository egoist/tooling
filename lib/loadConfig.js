'use strict'

const path = require('path')
const config = require('./webpack.config')

module.exports = function (type, options) {
	options.entry = [path.resolve(process.cwd(), options.entry || 'src')]
	return Object.assign({}, config(type, options), options)
}
