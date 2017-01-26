# Adapter

Adapter can use all options in [config file](./config.md).

## Run an adapter

```bash
# relative to cwd
yarn tooling <command> <entry> --adapter adapter.js

# it could also be an npm package which is installed in cwd
yarn tooling <command> <entry> --adapter react
# then it looks up `./node_modules/tooling-react`
```

## Create an adapter

Learn by example:

```js
// adapater for supporting vue single file component
module.exports = {
  webpack(cfg, options) {
    let loaders

    // extract css in single file component for production build
    if (options.mode === 'build') {
      loaders = {
        css: ExtractTextPlugin.extract({
          loader: 'css-loader?-autoprefixer',
          fallbackLoader: 'vue-style-loader'
        })
      }
    }

    cfg.module.rules.push({
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders
      }
    })

    return cfg
  }
}
```

Check out the [definition](./config.md#webpack) of `webpack` function.

## Prevent the default behaivor

By default after you mutate the current webpack config via `webpack` function, we'll use that final config to run webpack instance, however, there's a `prevent` option to stop tooling from running the default behaivor.

Here we use `webpack` function together with `prevent` option to run karma tests:

```js
module.exports = {
  prevent: true,
  webpack(cfg) {
    runKarma(cfg)
    // you don't need to return anything
    // since all following tasks are prevented
  }
}
```
