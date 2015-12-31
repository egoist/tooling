'use strict'

const path = require('path')
const assign = require('deep-assign')
const config = require('./webpack.config')

module.exports = function (opts) {
	opts.entry = [path.resolve(process.cwd(), opts.entry || 'src')]
	return assign({}, config, opts)
}
