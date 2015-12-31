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
		module: {
			loaders: [
				{
					test: /\.jsx?$/,
					loaders: [
						{ path: path.resolve(__dirname, '../node_modules/babel-loader') }
					],
					exclude: [/node_modules/]
				},
				{
					test: /\.vue$/,
					loaders: [
						{ path: path.resolve(__dirname, '../node_modules/vue-loader') }
					]
				},
				{
					test: /\.css$/,
					loaders: [
						{ path: path.resolve(__dirname, '../node_modules/style-loader') },
						{ path: path.resolve(__dirname, '../node_modules/css-loader') },
						{ path: path.resolve(__dirname, '../node_modules/postcss-loader') }
					]
				},
				{
			        test: /\.(png|jpg|gif)$/,
			        loaders: [
			        	{ path: path.resolve(__dirname, '../node_modules/url-loader') },
			        	{ path: path.resolve(__dirname, '../node_modules/file-loader') },
			        ],
			        exclude: [/node_modules/]
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
		config.entry.push('webpack-hot-middleware/client')
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
