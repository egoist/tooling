'use strict'

const path = require('path')
const webpack = require('webpack')
const localConfig = require(process.cwd() + '/package.json').tooling || {}
const pathExists = require('path-exists')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const postcssPlugins = [
	require('precss'),
	require('cssgrace'),
	require('autoprefixer')({
		browers: ['last 2 version', 'ie > 7']
	})
]

module.exports = function (type, options) {
	const config = {
		entry: options.entry,
		output: {
			path: path.resolve(process.cwd(), 'build'),
			filename: 'bundle.js',
			publicPath: '/build/'
		},
		resolve: {
			extensions: ['', '.js', '.vue', '.css', '.jsx']
		},
		resolveLoader: {
			modulesDirectories: ["web_loaders", "web_modules", "node_loaders", "node_modules", path.resolve(__dirname, '../node_modules')],
		},
		module: {
			loaders: [
				{
					test: /\.jsx?$/,
					loaders: ['babel'],
					exclude: [/node_modules/]
				},
				{
					test: /\.vue$/,
					loaders: ['vue']
				},
				{
					test: /\.css$/,
					loaders: ['style', 'css', 'postcss']
				},
				{
				        	test: /\.(png|jpg|gif)$/,
				        	loaders: ['url', 'file']
				}
			]
		},
		vue: {
			postcss: postcssPlugins
		},
		postcss: postcssPlugins,
		babel: {
		    presets: [require('babel-preset-es2015'), require('babel-preset-stage-0')],
		    plugins: [require('babel-plugin-transform-runtime')]
		},
		plugins: []
	}

	if (type === 'build') {
		const index = localConfig.index || {}
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
		  new HtmlWebpackPlugin(Object.assign({}, {
		    title: 'Tooling',
		  }, index))
		]
	}
	else if (type === 'watch') {
		config.debug = true
		config.watch = true
		config.entry.push(path.resolve(__dirname, '../node_modules/webpack-hot-middleware/client'))
		config.devtool = 'cheap-module-eval-source-map'
		config.plugins = [
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NoErrorsPlugin(),
			new webpack.DefinePlugin({
				'__DEV__': true,
				'process.env': JSON.stringify('development')
			})
		]
		if (options.browsersync) {
			config.plugins.push(new BrowserSyncPlugin({
				proxy: `localhost:${config.port || 7888}`,
				files: [path.resolve(process.cwd(), 'build/**/*')],
				port: 23789
			}))
		}
	}
	const localWebpackConfig  = process.cwd() + '/webpack.config.js'
	if (pathExists.sync(localWebpackConfig)) {
		return Object.assign({}, config, require(localWebpackConfig))
	} else {
		return config
	}
}
