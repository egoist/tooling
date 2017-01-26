const ExtractTextPlugin = require('extract-text-webpack-plugin')

function getLoaders(options) {
  options = options || {}
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
        fallbackLoader: 'style-loader'
      })
    }
    return ['style-loader', sourceLoader].join('!')
  }

  return {
    css: generateLoaders(['css?-autoprefixer', 'postcss']),
    less: generateLoaders(['css?-autoprefixer', 'postcss', 'less']),
    sass: generateLoaders(['css?-autoprefixer', 'postcss', 'sass?indentedSyntax']),
    scss: generateLoaders(['css?-autoprefixer', 'postcss', 'sass']),
    stylus: generateLoaders(['css?-autoprefixer', 'postcss', 'stylus']),
    styl: generateLoaders(['css?-autoprefixer', 'postcss', 'stylus'])
  }
}

// Generate loaders for standalone style files (outside of .vue)
module.exports = function (options) {
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
