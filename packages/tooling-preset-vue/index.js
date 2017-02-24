const path = require('path')

module.exports = function ({config, inherit, options}) {
  inherit('web', options)

  const projectModules = path.join(__dirname, 'node_modules')

  config
    .module
      .rule('vue:compile')
        .test(/\.vue$/)
        .loader('vue', 'vue-loader')
        .end()
      .end()
    .resolve
      .extensions
        .add('.vue')
        .end()
      .modules
        .add(projectModules)
        .end()
      .end()
    .resolveLoader
      .modules
        .add(projectModules)

  let vueLoaders = {}
  for (const lang of ['css', 'stylus', 'sass', 'scss', 'less']) {
    const rule = config.module.rules.get(`web-compile-${lang}`)
    vueLoaders = rule.toConfig().use
  }

  config
    .plugin('web-loader-options')
    .update(loaderOptions => {
      loaderOptions.options.vue = {
        loaders: Object.assign({
          js: 'babel-loader'
        }, vueLoaders)
      }
      return loaderOptions
    })
}
