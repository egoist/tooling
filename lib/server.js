const path = require('path')
const express = require('express')
const proxyMiddleware = require('http-proxy-middleware')

module.exports = function (compiler, options) {
  const server = express()

  const devMiddleWare = require('webpack-dev-middleware')(compiler, {
    publicPath: compiler.options.output.publicPath,
    quiet: !options.normalLog,
    stats: options.normalLog ? {
      colors: true,
      children: false,
      chunks: false,
      modules: false
    } : undefined
  })

  server.use(devMiddleWare)
  server.use(require('webpack-hot-middleware')(compiler, {
    log: () => null
  }))

  server.use(require('connect-history-api-fallback')({index: '/'}))

  const mfs = devMiddleWare.fileSystem
  const file = path.join(compiler.options.output.path, 'index.html')

  if (options.proxy) {
    server.use(proxyMiddleware('/api', {
      target: options.proxy,
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    }))
  }

  server.use('/static', express.static(path.join(compiler.options.output.path, 'static')))

  server.get('/', (req, res) => {
    devMiddleWare.waitUntilValid(() => {
      res.end(mfs.readFileSync(path.join(file), 'utf8'))
    })
  })

  return server
}
