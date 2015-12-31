const path = require('path')
const express = require('express')
const webpack = require('webpack')

const app = express()

module.exports = function (config, cb) {
	const port = config.port || 7888
	delete config.port
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

	app.listen(port, 'localhost', err => {
		if (err) {
			return console.log(err)
		}
		console.log(`Listening at http://localhost:${port}`)
		cb(port)
	})
}
