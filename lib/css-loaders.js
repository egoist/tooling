const ExtractTextPlugin = require('extract-text-webpack-plugin')

function getLoaders(options) {
  options = Object.assign({
    styleLoader: 'style-loader'
  }, options)
  // generate loader string to be used with extract text plugin
  function generateLoaders(loaders) {
    const sourceLoader = loaders.map(loader => {
      let extraParamChar
      if (/\?/.test(loader)) {
        loader = loader.replace(/\?/, '-loader?')
        extraParamChar = '&'
      } else {
        loader += '-loader'
        extraParamChar = '?'
      }
      return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '')
    }).join('!')

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        loader: sourceLoader,
        fallbackLoader: options.styleLoader
      })
    }
    return [options.styleLoader, sourceLoader].join('!')
  }

  let cssLoader = 'css?-autoprefixer'
  if (options.cssModules) {
    cssLoader += '&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
  }

  return {
    css: generateLoaders([cssLoader, 'postcss']),
    less: generateLoaders([cssLoader, 'postcss', 'less']),
    sass: generateLoaders([cssLoader, 'postcss', 'sass?indentedSyntax']),
    scss: generateLoaders([cssLoader, 'postcss', 'sass']),
    stylus: generateLoaders([cssLoader, 'postcss', 'stylus']),
    styl: generateLoaders([cssLoader, 'postcss', 'stylus'])
  }
}

function cssLoaders(options) {
  const output = []
  const loaders = getLoaders(options)
  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      loader
    })
  }
  return output
}

module.exports = cssLoaders
module.exports.getLoaders = getLoaders
