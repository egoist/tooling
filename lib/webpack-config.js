'use strict'
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const LiveReloadPlugin = require('webpack-livereload-plugin')
const _ = require('./utils')

module.exports = function (options) {
  const dist = options.dist
  console.log(options)
  const config = {
    devtool: options.production ?
      'sourcemap' :
      'cheap-module-eval-source-map',
    entry: options.entry,
    output: {
      path: _.cwd(`${dist}/assets`),
      filename: '[name].[chunkhash].js',
      publicPath: './assets/'
    },
    resolve: {
      extensions: ['', '.js', '.jsx', '.css', '.json'],
      fallback: [
        _.cwd(),
        _.cwd('node_modules'),
        _.dir('node_modules')
      ]
    },
    resolveLoader: {
      modulesDirectories: [
        _.cwd('node_modules'),
        _.dir('node_modules')
      ]
    },
    module: {
      loaders: [
        {
          test: /\.(jsx?|es6|es)$/,
          loaders: ['babel'],
          exclude: [/node_modules/]
        },
        {
          test: /\.json$/,
          loaders: ['json']
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
        }
      ]
    },
    babel: {
      babelrc: false,
      presets: [
        require('babel-preset-es2015'),
        require('babel-preset-stage-1')
      ],
      plugins: [
        require('babel-plugin-transform-runtime')
      ]
    },
    postcss(webpack) {
      return [
        require('postcss-import')({
          addDependencyTo: webpack
        }),
        require('postcss-nested'),
        require('postcss-simple-vars')
      ]
    },
    plugins: []
  }

  if (options.html !== false) {
    config.plugins.push(
      new HtmlWebpackPlugin({
        filename: _.cwd(`${dist}/index.html`),
        title: options.title || 'Hello Tooling!',
        template: options.template || _.dir('lib/index.html'),
        inject: true,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        }
      })
    )
  }

  if (options.production) {
    config.plugins = config.plugins.concat([
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
      new ProgressBarPlugin()
    ])
  } else {
    config.output.filename = '[name].js'
    config.output.publicPath = '/assets/'
    config.plugins = config.plugins.concat([
      new webpack.NoErrorsPlugin(),
      /*eslint-disable */
      new webpack.DefinePlugin({
        __DEV__: true,
        'process.env': JSON.stringify('development')
      })
      /*eslint-enable */
    ])
    if (options.live) {
      config.plugins.push(
        new LiveReloadPlugin({
          appendScriptTag: true
        })
      )
    }
  }

  return config
}
