'use strict'
/**
 * Module dependencies
 */
const Path = require('path')
const cwd = require('cwd')
const $ = require('shelljs')
const webpack = require('webpack')
const deepAssign = require('deep-assign')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const NpmInstallPlugin = require('npm-install-webpack-plugin')
const LiveReloadPlugin = require('webpack-livereload-plugin')
const loadToolingConfig = require('./loadToolingConfig')

/**
 * Return an absolute path from tooling installation folder
 */
function dir(fp) {
  return Path.join(__dirname, '../', fp)
}

/**
 * Return a basic webpack config
 *
 * @param {String} type - either 'build' or 'watch'
 * @param {Object} options - cli arguments
 * @returns {Object} webpack config
 */
module.exports = function baseConfig(type, options) {
  /**
   * Loading tooling config from package.json in cwd
   */
  const toolingConfig = loadToolingConfig()
  deepAssign(options, toolingConfig)
  const outputPath = cwd(options.dest || 'build')

  const config = {
    devtool: type === 'watch' ? 'cheap-module-eval-source-map' : 'source-map',
    entry: options.entry || 'src/index',
    output: {
      path: outputPath,
      filename: 'bundle.js',
      publicPath: './'
    },
    resolve: {
      extensions: ['', '.js', '.css', '.json'],
      root: [
        cwd(),
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
        },
        {
          test: /\.json$/,
          loaders: ['json']
        }
      ]
    },
    babel: {
      presets: [require('babel-preset-es2015'), require('babel-preset-stage-0')],
      plugins: [require('babel-plugin-transform-runtime')]
    },
    plugins: []
  }
  // for both watch and build
  if (options.cssnext) {
    config.postcss = [
      require('postcss-cssnext')(options.cssnext)
    ]
  } else {
    config.postcss = [
      require('precss'),
      require('rucksack-css')({
        autoprefixer: {
          browers: options.browsers
        },
        fallbacks: options.fallbacks === undefined ? true : options.fallbacks
      })
    ]
  }
  let postcssLoader = options.cssmodules ?
    'css-loader?modules&importLoaders=1!postcss-loader' :
    'css-loader!postcss-loader'
  if (options.sugarss) {
    postcssLoader += '?parser=sugarss'
  }
  // set format
  if (options.umd) {
    config.output.libraryTarget = 'umd'
    config.output.library = options.umd
  } else if (options.cjs) {
    config.output.libraryTarget = 'commonjs2'
  }
  // set target
  if (options.target) {
    config.target = options.target
  }
  // add html plugin if not targeted in commonjs
  if (!options.cjs && !options.disableHtml) {
    config.plugins.push(
      new HtmlWebpackPlugin(Object.assign({}, {
        title: options.title || 'Tooling',
        template: dir('lib/index.jade'),
        inject: false
      }, options.index))
    )
  }
  // add module.exports
  if (options.cjs || options.umd) {
    config.babel.plugins.push(require('babel-plugin-add-module-exports'))
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
        loader: `style-loader!${postcssLoader}`
      }
    )
    // add plugins
    config.plugins = config.plugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.DefinePlugin({
        __DEV__: true,
        'process.env': JSON.stringify('development')
      })
    ])
    // inject autoInstall
    if (options.autoInstall) {
      config.plugins.push(new NpmInstallPlugin())
    }
    // inject  browserSync
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
    // inject livereload
    if (options.live) {
      config.plugins.push(new LiveReloadPlugin({
        appendScriptTag: true
      }))
    }
  } else if (type === 'build') {
    if (options.clean) {
      $.rm('-r', outputPath)
    }
    // add hash to bundled filename
    // so that it supports long term caching
    config.output.filename = options.filename || 'bundle.[chunkhash].js'
    // exteact css into a single file
    config.module.loaders.push(
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', postcssLoader)
      }
    )
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
      new ExtractTextPlugin('styles.[contenthash].css')
    ])
    if (!options.pretty) {
      config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        },
        comments: false
      }))
    }
  }
  return config
}
