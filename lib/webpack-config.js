'use strict'
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const LiveReloadPlugin = require('webpack-livereload-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const _ = require('./utils')

module.exports = function (options) {
  const dist = options.dist
  const babel = options.babel || {
    babelrc: false,
    presets: [
      require('babel-preset-es2015'),
      require('babel-preset-stage-1')
    ],
    plugins: [
      require('babel-plugin-transform-runtime')
    ]
  }

  const postcss = options.postcss || (webpack => {
    return [
      require('postcss-import')({
        addDependencyTo: webpack
      }),
      require('postcss-nested'),
      require('postcss-simple-vars'),
      require('autoprefixer')({
        browsers: options.browsers
      })
    ]
  })
  if (options.react) {
    babel.plugins.push(require('babel-plugin-transform-react-jsx'))
  }
  const cssModules = options.cssModules ?
    '?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]' :
    ''
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
          loader: options.production ?
            ExtractTextPlugin.extract('style-loader', `css-loader${cssModules}!postcss-loader`) :
            `style-loader!css-loader${cssModules}!postcss-loader`
        }
      ]
    },
    babel,
    postcss,
    plugins: []
  }

  if (typeof options.umd === 'string') {
    config.output.libraryTarget = 'umd'
    config.output.library = options.umd
  } else if (options.cjs) {
    config.output.libraryTarget = 'commonjs2'
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
    /* eslint-disable quote-props */
    config.plugins = config.plugins.concat([
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
        },
        comments: false
      }),
      new ProgressBarPlugin(),
      new ExtractTextPlugin('[name].[contenthash].css')
    ])
    /* eslint-enable */
  } else {
    config.output.filename = '[name].js'
    config.output.publicPath = '/assets/'
    /* eslint-disable quote-props */
    config.plugins = config.plugins.concat([
      new webpack.NoErrorsPlugin(),
      new webpack.DefinePlugin({
        __DEV__: true,
        'process.env': {
          'NODE_ENV': JSON.stringify('development')
        }
      })
    ])
    /* eslint-enable */
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
