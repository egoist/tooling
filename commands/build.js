'use strict'

const path = require('path')
const webpack = require('webpack')
const assign = require('deep-assign')
const loadConfig = require('../lib/loadConfig')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function (options) {
	// settings for generated index.html
	const index = options.index
	delete options.index
	const config = loadConfig(options)
	config.output.filename = 'bundle.[hash].js'
	config.output.publicPath = './'
	config.plugins = [
	  new webpack.optimize.OccurenceOrderPlugin(),
	  new webpack.DefinePlugin({
	    '__DEV__': false,
	    'process.env': {
	      'NODE_ENV': JSON.stringify('production')
	    }
	  }),
	  new webpack.optimize.UglifyJsPlugin({
	    compressor: {
	      warnings: false
	    }
	  }),
	  new HtmlWebpackPlugin(assign({}, {
	    title: 'Tooling',
	  }, index))
	]
	webpack(config, (err, stats) => {
		if (err) {
			return console.log(err)
		}
		console.log(stats.toString({
			colors: true
		}))
	})
}
