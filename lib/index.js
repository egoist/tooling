/* eslint-disable complexity */
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const PostCompile = require('post-compile-webpack-plugin')
const FriendlyErrors = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractText = require('extract-text-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const isYarn = require('installed-by-yarn-globally')
const pick = require('object-picker')
const loadAdapter = require('./load-adapter')
const createServer = require('./server')
const log = require('./log')
const cssLoaders = require('./css-loaders')
const readPkg = require('./read-pkg')
const AppError = require('./app-error')

module.exports = function (options) {
  let config
  if (options.config && fs.existsSync(options.config)) {
    config = require(path.resolve(process.cwd(), options.config))
  }

  const defaultOptions = {
    entry: 'index.js',
    port: 4000,
    dist: 'dist',
    autoprefixer: {
      browsers: ['last 4 versions', 'ie > 8']
    },
    babel: {
      babelrc: false,
      presets: [
        [require.resolve('babel-preset-latest'), {
          es2015: {modules: false}
        }]
      ]
    },
    externals: []
  }

  options = Object.assign(
    {},
    defaultOptions,
    config && pick(config, Object.keys(defaultOptions).concat(['postcss'])),
    options
  )

  options.postcss = options.postcss || {
    plugins: [
      require('autoprefixer')(options.autoprefixer)
    ]
  }

  // padding
  console.log()

  if (!fs.existsSync(options.entry)) {
    throw new AppError(`> ${options.entry} does not exist, did you forget to create one?`)
  }

  const pkg = readPkg({})

  const webpack = require('webpack')

  // infer html title
  const htmlTitle = options.title || pkg.productName || pkg.title || 'Tooling App'
  const htmlTemplate = fs.existsSync('template.html') ? path.join(process.cwd(), 'template.html') : path.join(__dirname, 'template.html')

  let babelOptions
  if (fs.existsSync('.babelrc')) {
    console.log('> Using .babelrc in current working directory')
    babelOptions = {babelrc: true}
  } else {
    babelOptions = options.babel
  }

  let postcssOptions
  if (!fs.existsSync('postcss.config.js')) {
    postcssOptions = options.postcss
  }

  let webpackConfig = {
    entry: {
      client: [options.entry]
    },
    output: {
      path: path.resolve(process.cwd(), options.dist),
      filename: options.mode === 'build' ? '[name].[chunkhash:8].js' : '[name].js',
      publicPath: '/'
    },
    externals: options.externals,
    resolve: {
      extensions: ['.js', '.css', '.json'],
      modules: [
        path.join(__dirname, '../node_modules'),
        path.join(process.cwd(), 'node_modules'),
        process.cwd()
      ]
    },
    resolveLoader: {
      modules: [
        path.join(__dirname, '../node_modules'),
        path.join(process.cwd(), 'node_modules')
      ]
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: [/node_modules/]
        },
        {
          test: /\.es6$/,
          loader: 'babel-loader'
        }
      ].concat(cssLoaders({extract: options.mode === 'build'}))
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        options: {
          context: process.cwd(),
          babel: babelOptions,
          postcss: postcssOptions
        }
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        __DEV__: process.env.NODE_ENV === 'development'
      })
    ]
  }

  const filename = path.basename(options.entry)

  if (options.lib) {
    webpackConfig.output.filename = replaceExtension(filename, '.js')
    webpackConfig.output.library = typeof options.lib === 'string' ?
      options.lib :
      getLibraryName(replaceExtension(filename, ''))
    webpackConfig.output.libraryTarget = 'umd'
  } else {
    // only output index.html in non-lib mode
    webpackConfig.plugins.unshift(
      new HtmlWebpackPlugin({
        title: htmlTitle,
        template: htmlTemplate
      })
    )
  }

  // copt static folder
  if (fs.existsSync('static')) {
    webpackConfig.plugins.push(
      new CopyPlugin([
        {
          from: 'static',
          to: 'static'
        }
      ])
    )
  }

  if (options.mode === 'dev') {
    if (!options.normalLog) {
      webpackConfig.plugins.push(
        new FriendlyErrors()
      )
    }

    webpackConfig.entry.client.unshift(
      require.resolve('webpack-hot-middleware/client') + '?reload=true'
    )

    webpackConfig.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new PostCompile(() => {
        console.log(chalk.bold(`> Open http://localhost:${options.port}`))
      })
    )
  } else if (options.mode === 'build') {
    const ProgressPlugin = require('webpack/lib/ProgressPlugin')

    webpackConfig.plugins.push(
      new ProgressPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compressor: {
          warnings: false
        },
        output: {
          comments: false
        }
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true
      })
    )

    if (options.lib) {
      webpackConfig.plugins.push(
        new ExtractText(replaceExtension(filename, '.css'))
      )
    } else {
      webpackConfig.plugins.push(
        new ExtractText(options.mode === 'build' ? '[name].[contenthash:8].css' : '[name].css')
      )
    }
  }

  if (isYarn(__dirname)) {
    const parentDir = path.join(__dirname, '../../')
    webpackConfig.resolve.modules.push(parentDir)
    webpackConfig.resolveLoader.modules.push(parentDir)
  }

  // apply config file
  if (config && config.webpack) {
    webpackConfig = config.webpack(webpackConfig, options, webpack)
  }

  // apply adapter
  const adapter = loadAdapter(options.adapter)
  if (adapter) {
    if (adapter.webpack) {
      webpackConfig = adapter.webpack(webpackConfig, options, webpack)
    }

    if (adapter.prevent) {
      return
    }
  }

  let compiler
  try {
    compiler = webpack(webpackConfig)
  } catch (err) {
    if (err.name === 'WebpackOptionsValidationError') {
      throw new AppError(err.message)
    } else {
      throw err
    }
  }

  if (options.mode === 'dev') {
    const server = createServer(compiler, options)
    server.listen(options.port)
  } else if (options.mode === 'build') {
    return new Promise((resolve, reject) => {
      compiler.run((err, stats) => {
        if (err) {
          return reject(err)
        }
        if (stats.hasErrors() || stats.hasWarnings()) {
          return reject(new AppError(stats.toString('errors-only')))
        }
        console.log(stats.toString({
          colors: true,
          children: false,
          chunks: false,
          modules: false
        }))
        console.log()
        log.success('Compiled successfully!')
        if (options.lib) {
          console.log(`The ${chalk.cyan(options.dist)} folder is ready to be published.`)
          console.log(`Make sure you have correctly set package.json\n`)
        } else {
          console.log(`The ${chalk.cyan(options.dist)} folder is ready to be deployed.`)
          console.log(`You may also serve it locally with a static server:\n`)
          console.log(`  ${chalk.yellow('npm')} i -g serve`)
          console.log(`  ${chalk.yellow('serve')} ${options.dist}\n`)
        }
      })
    })
  }
}

function replaceExtension(str, ext) {
  return str.replace(/\.(vue|js)$/, ext)
}

function getLibraryName(str) {
  return str.replace(/[-_.]([\w])/, (_, p1) => p1.toUpperCase())
}
