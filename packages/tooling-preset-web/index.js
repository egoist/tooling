const path = require('path')
const webpack = require('webpack')
const NoEmitOnErrorsPlugin = require('webpack/lib/NoEmitOnErrorsPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PostCompilePlugin = require('post-compile-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = function ({type, config, options}) {
  const isBuild = type === 'build'

  options = Object.assign({
    entry: 'index.js',
    dist: 'dist',
    html: {
      title: 'Tooling: Homepage',
      template: path.join(__dirname, 'template.html')
    },
    sourceMap: isBuild,
    minimize: isBuild,
    extract: isBuild,
    hash: isBuild,
    vendor: isBuild
  }, options)

  const filename = {
    js: options.hash ? '[name].[chunkhash:8].js' : '[name].js',
    css: options.hash ? '[name].[contenthash:8].css' : '[name].css'
  }

  const BABEL_OPTIONS = {
    babelrc: true,
    presets: [
      [require.resolve('babel-preset-latest'), {
        es2015: {modules: false}
      }]
    ]
  }

  config
    .context(process.cwd())
    .devtool(isBuild ? 'source-map' : 'eval-source-map')
    .performance
      .set('hints', false)
      .end()
    .entry('web-client')
      .add(options.entry)
      .end()
    .output
      .path(path.resolve(options.dist))
      .publicPath('/')
      .filename(filename.js)
      .end()
    .resolve
      .extensions
        .add('.js')
        .add('.jsx')
        .add('.css')
        .add('.json')
        .end()
      .modules
        .add(process.cwd())
        .add(path.join(__dirname, 'node_modules'))
        .add(path.join(process.cwd(), 'node_modules'))
        .end()
      .end()
    .resolveLoader
      .modules
        .add(path.join(__dirname, 'node_modules'))
        .add(path.join(process.cwd(), 'node_modules'))
        .end()
      .end()
    .module
      .rule('web-compile-js')
        .test(/\.jsx?$/)
        .exclude([/node_modules/])
        .loader('babel', 'babel-loader')
        .end()
      .rule('web-compile-es6')
        .test(/\.es6$/)
        .loader('babel', 'babel-loader')
        .end()
      .end()
    .plugin('web-no-emit-on-errors')
      .use(NoEmitOnErrorsPlugin)
      .end()
    .plugin('web-Html')
      .use(HtmlWebpackPlugin, options.html)
      .end()
    .plugin('web-loader-options')
      .use(webpack.LoaderOptionsPlugin, {
        minimize: options.minimize,
        sourceMap: options.sourceMap,
        options: {
          context: process.cwd(),
          babel: BABEL_OPTIONS
        }
      })
      .end()
    .plugin('web-define')
      .use(webpack.DefinePlugin, {
        process: {
          env: {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV)
          }
        }
      })

  applyCSSLoaders()

  if (isBuild) {
    config
      .plugin('web-uglify')
        .use(webpack.optimize.UglifyJsPlugin, {
          /* eslint-disable camelcase */
          sourceMap: Boolean(options.sourceMap),
          compressor: {
            warnings: false,
            conditionals: true,
            unused: true,
            comparisons: true,
            sequences: true,
            dead_code: true,
            evaluate: true,
            if_return: true,
            join_vars: true,
            negate_iife: false
          },
          output: {
            comments: false
          }
          /* eslint-enable camelcase */
        })

    if (options.vendor) {
      config
        .plugin('web-commons-chunk-vendor')
          .use(webpack.optimize.CommonsChunkPlugin, {
            name: 'vendor',
            minChunks: module => {
              return module.resource && /\.(js|css|es6)$/.test(module.resource) && module.resource.indexOf('node_modules') !== -1
            }
          })
          .end()
        .plugin('web-commons-chunk-manifest')
          .use(webpack.optimize.CommonsChunkPlugin, {
            name: 'manifest'
          })
          .end()
    }
  } else {
    config
      .entry('web-client')
        .prepend(path.join(__dirname, './dev-client.es6'))
        .end()
      .plugin('web-hmr')
        .use(webpack.HotModuleReplacementPlugin)
        .end()
  }

  function applyCSSLoaders() {
    const loaders = {
      css: 'postcss-loader',
      sass: 'sass-loader?indentedSyntax',
      scss: 'sass-loader',
      less: 'less-loader',
      stylus: 'stylus-loader',
      styl: 'stylus-loader'
    }

    for (const lang in loaders) {
      if (options.extract) {
        const extractPlugin = ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', loaders[lang]]
        })
        config
          .module
            .rule(`web-compile-${lang}`)
              .test(new RegExp(`\\.${lang}$`))
              .loader('extract', extractPlugin[0].loader, extractPlugin[0].options)
              .loader('style', 'style-loader')
              .loader('css', 'css-loader')
              .loader(lang, loaders[lang])
              .end()
            .end()
          .plugin('web-extract-css')
            .use(ExtractTextPlugin, filename.css)
            .end()
      } else {
        config
          .module
            .rule(`web-compile-${lang}`)
              .test(new RegExp(`\\.${lang}$`))
              .loader('style', 'style-loader')
              .loader('css', 'css-loader')
              .loader(lang, loaders[lang])
              .end()
      }
    }
  }
}
