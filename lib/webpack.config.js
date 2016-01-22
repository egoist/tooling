'use strict'

const path = require('path')
const webpack = require('webpack')
const pathExists = require('path-exists')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const postcssPlugins = [
	require('precss'),
	require('rucksack-css')({
		autoprefixer: {
			browers: ['last 2 version', 'ie > 7']
		},
		fallbacks: true
	})
]

module.exports = function (type, options) {
	options.use = options.use || 'vue'
	const config = {
		entry: options.entry,
		output: {
			path: path.join(process.cwd(), 'build'),
			filename: 'bundle.js',
			publicPath: '/build/'
		},
		resolve: {
			extensions: ['', '.js', '.vue', '.css', '.jsx', '.json'],
			root: [path.join(process.cwd(), 'node_modules'), path.join(__dirname, '../node_modules')]
		},
		resolveLoader: {
			modulesDirectories: ['web_loaders', 'web_modules', 'node_loaders', 'node_modules', path.join(__dirname, '../node_modules')]
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
					loaders: ['url', 'file']
				},
				{
					test: /\.json/,
					loaders: ['json']
				},
				{
					test: /\.svg$/,
					loaders: ['raw']
				}
			]
		},
		postcss: postcssPlugins,
		babel: {
			presets: [require('babel-preset-es2015'), require('babel-preset-stage-0')],
			plugins: [require('babel-plugin-transform-runtime')]
		},
		plugins: []
	}
	// read tooling local config from package.json
	let localConfig = {}
	if (pathExists.sync(process.cwd() + '/package.json')) {
		localConfig = require(process.cwd() + '/package.json').tooling || {}
	}
	// read html-webpack-plugin config from local tooling Config
	const index = localConfig.index || {}
	if (options.use === 'react') {
		// push preset for React
		config.babel.presets.push(require('babel-preset-react'))
	} else if (options.use === 'vue') {
		// push options for Vue
		config.vue = {
			// loaders: {},
			postcss: postcssPlugins
		}
		// push vue-loader for Vue component
		config.module.loaders.push({
			test: /\.vue$/,
			loaders: ['vue']
		})
	}
	if (type === 'build') {
		config.devtool = 'source-map'
		config.output.filename = 'bundle.[chunkhash].js'
		config.output.publicPath = './'
		config.module.loaders.push(
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
			}
		)
		config.vue.loaders.css = ExtractTextPlugin.extract('style-loader', 'css-loader')
		config.plugins = [
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
			new HtmlWebpackPlugin(Object.assign({}, {
				title: 'Tooling',
				template: path.join(__dirname, 'index.html')
			}, index)),
			new ExtractTextPlugin('styles.[contenthash].css')
		]
	} else if (type === 'watch') {
		config.debug = true
		config.watch = true
		config.output.publicPath = '/'
		config.output.path = process.cwd()
		config.entry.push('webpack-hot-middleware/client')
		config.devtool = 'cheap-module-eval-source-map'
		if (options.use === 'react') {
			// enable hot mode replacement for React
			config.babel.env = {
				development: {
					presets: [require('babel-preset-react-hmre')]
				}
			}
		}
		config.module.loaders.push(
			{
				test: /\.css$/,
				loaders: ['style', 'css', 'postcss']
			}
		)
		config.plugins = [
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NoErrorsPlugin(),
			new webpack.DefinePlugin({
				'__DEV__': true,
				'process.env': JSON.stringify('development')
			}),
			new HtmlWebpackPlugin(Object.assign({}, {
				title: 'Tooling',
				template: path.join(__dirname, 'index.html')
			}, index))
		]
		if (options.browsersync) {
			config.plugins.push(new BrowserSyncPlugin({
				proxy: `localhost:${options.port || 7888}`,
				files: [path.join(process.cwd(), 'build/**/*')],
				port: 23789
			}))
		}
	}
	const localWebpackConfig = process.cwd() + '/webpack.config.js'
	if (pathExists.sync(localWebpackConfig)) {
		return Object.assign({}, config, require(localWebpackConfig))
	}
	return config
}
