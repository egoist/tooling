'use strict'

const cwd = require('cwd')
const gh = require('gh-pages')
const loadToolingConfig = require('../lib/loadToolingConfig')

module.exports = function (dir) {
	const toolingConfig = loadToolingConfig()
	dir = dir || toolingConfig.dest || 'build'
	gh.publish(cwd(dir), {
	  logger(message) {
	    console.log(message)
	  }
	}, err => {
		if (err) {
			return console.log(err)
		}
		console.log('Done!')
	})
}
