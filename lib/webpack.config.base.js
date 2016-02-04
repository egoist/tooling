'use strict'

/**
 * Module dependencies
 */
const Path = require('path')
const objectString = require('object-string')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const NpmInstallPlugin = require('npm-install-webpack-plugin')
const loadToolingConfig = require('./loadToolingConfig')

/**
 * Return an absolute path from current working directory
 */
function cwd(fp) {
	return Path.join(process.cwd(), fp)
}

/**
 * Return an absolute path from tooling installation folder
 */
function dir(fp) {
	return Path.join(__dirname, '../', fp)
}

/**
 * Loading tooling config from package.json in cwd
 */
const toolingConfig = loadToolingConfig()

/**
 * Return a basic webpack config
 *
 * @param {String} type - either 'build' or 'watch'
 * @param {Object} options - cli arguments
 * @returns {Object} webpack config
 */
module.exports = function (type, options) {
	const config = {
		devtool: type === 'watch' ? 'cheap-module-eval-source-map' : 'source-map',
		entry: options.entry ? objectString(options.entry) : 'src/index',
		output: {
			path: cwd('build'),
			filename: 'bundle.js',
			publicPath: './'
		},
		resolve: {
			extensions: ['', '.js', '.css'],
			root: [
				process.cwd(),
				cwd('node_modules'),
				dir('node_modules')
			]
		},
		resolveLoader: {
			root: [
				cwd('node_modules'),
				dir('node_modules')
			]
		},
		module: {
			loaders: [
				{
					test: /\.jsx?$/,
					loaders: ['babel'],
					exclude: [/node_modules/]
				},
				{
					test: /\.(png|jpg|gif)$/,
					loader: 'url?limit=1000&name=images/[hash].[ext]',
					exclude: [/node_modules/]
				},
				{
					test: /\.jade$/,
					loaders: ['jade']
				}
			]
		},
		babel: {
			presets: [require('babel-preset-es2015'), require('babel-preset-stage-0')],
			plugins: [require('babel-plugin-transform-runtime')]
		},
		postcss: [
			require('precss'),
			require('rucksack-css')({
				autoprefixer: {
					browers: ['last 2 version', 'ie > 7']
				},
				fallbacks: true
			})
		],
		plugins: [
			new HtmlWebpackPlugin(Object.assign({}, {
				title: 'Tooling',
				template: dir('lib/index.jade')
			}, toolingConfig.index))
		]
	}
	if (type === 'watch') {
		// inject client page for hmr
		if (typeof config.entry === 'string') {
			// entry is a string
			config.entry = [config.entry, dir('node_modules/webpack-hot-middleware/client')]
		} else if (typeof config.entry === 'object') {
			if (Array.isArray(config.entry)) {
				// entry is an array
				config.entry.push(dir('node_modules/webpack-hot-middleware/client'))
			} else {
				// entry is an object
				config.entry.hmrClient = dir('node_modules/webpack-hot-middleware/client')
			}
		}
		// css loaders
		config.module.loaders.push(
			{
				test: /\.css$/,
				loaders: ['style', 'css', 'postcss']
			}
		)
		// add plugins
		config.plugins = [
			...config.plugins,
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NoErrorsPlugin(),
			new webpack.DefinePlugin({
				'__DEV__': true,
				'process.env': JSON.stringify('development')
			})
		]
		// inject autoInstall
		if (options.autoInstall) {
			config.plugins.push(new NpmInstallPlugin())
		}
		if (options.browserSync) {
			let port = 23789
			if (typeof options.browserSync === 'number') {
				port = options.port
			}
			config.plugins.push(new BrowserSyncPlugin({
				proxy: `localhost:${options.port || 7888}`,
				files: [cwd('build/**/*')],
				port
			}))
		}
	} else if (type === 'build') {
		// add hash to bundled filename
		// so that it supports long term caching
		config.output.filename = 'bundle.[chunkhash].js'
		// exteact css into a single file
		config.module.loaders.push(
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
			}
		)
		config.plugins = [
			...config.plugins,
			new webpack.optimize.OccurenceOrderPlugin(),
			/*eslint-disable */
			new webpack.DefinePlugin({
				'__DEV__': false,
				'process.env': {
					'NODE_ENV': JSON.stringify('production')
				}
			}),
			/*eslint-enable */
			new webpack.optimize.UglifyJsPlugin({
				compressor: {
					warnings: false
				},
				comments: false
			}),
			new ExtractTextPlugin('styles.[contenthash].css')
		]
	}
	return config
}
