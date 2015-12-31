const path = require('path')
const postcssPlugins = [
	require('precss'),
	require('autoPrefixer')({
		browers: ['last 2 version']
	})
]

module.exports = {
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
			}
		]
	},
	postcss: postcssPlugins,
	babel: {
	    presets: [require('babel-preset-es2015'), require('babel-preset-stage-0')],
	    plugins: [require('babel-plugin-transform-runtime')]
	}
}
