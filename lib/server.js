const hotServer = require('webpack-hot-server')

module.exports = function (port, config) {
	return hotServer({
		port,
		config
	})
}
