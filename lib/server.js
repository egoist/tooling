const path = require('path')
const express = require('express')
const webpack = require('webpack')

const app = express()

module.exports = function (config) {
	const compiler = webpack(config)
	if (process.env.HOT) {
		// options for dev env
	}

	app.use(require('webpack-dev-middleware')(compiler, {
		publicPath: config.output.publicPath,
		stats: {
			colors: true
		}
	}))

	app.use(require('webpack-hot-middleware')(compiler))

	app.get('*', function(req, res) {
		res.sendFile(path.join(__dirname, 'index.html'))
	})

	const port = process.env.TOOLING_PORT || 7888
	app.listen(port, 'localhost', function(err) {
		if (err) {
			return console.log(err)
		}
		console.log(`Listening at http://localhost:${port}`)
	})
}
