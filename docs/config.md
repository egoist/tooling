# Config file

## Use a config file

An example `config.js`:

```js
module.exports = {
  port: 3000,
  webpack(cfg, webpack) {
    // update cfg
    return cfg
  }
}
```

Then load it:

```bash
yarn tooling build index.js --config config.js
```

## Config

To access the `options` you can use a function which returns the config, and the first argument of the function is `options`.

### port

Type: `number`<br>
Default: `4000`

### webpack

Type: `function`

The full `webpack` function arguments:

- `cfg`: current webpack config
- `webpack`: The webpack module

### autoprefixer

Default:

```js
{
  browsers: ['last 4 versions', 'ie > 8']
}
```

### postcss

It respects `postcss.config.js`

Default:

```js
{
  plugins: [
    require('autoprefixer')(options.autoprefixer)
  ]
}
```

### babel

It respects `.babelrc`

Default:

```js
{
  babelrc: false,
  presets: [
    [require.resolve('babel-preset-latest'), {
      es2015: {modules: false}
    }],
    require.resolve('babel-preset-stage-2')
  ],
  plugins: [
    [require.resolve('babel-plugin-transform-runtime'), {
      helpers: false,
      polyfill: false,
      regenerator: true,
      // Resolve the Babel runtime relative to the config.
      moduleName: path.dirname(require.resolve('babel-runtime/package'))
    }]
  ]
}
```


### externals

Default: `[]`

Same as webpack's [externals](https://webpack.js.org/configuration/externals/) options.

### adapter

Default: `undefined`

Set `--adapter` here.

### cssModules

Default: `false`

Use CSS modules.
