# Config file

## Use a config file

An example `config.js`:

```js
module.exports = {
  port: 3000,
  webpack(cfg, options, webpack) {
    // update cfg
    return cfg
  }
}
```

Then load it:

```bash
yarn tooling build index.js --config config.js
```

## Options

### port

Type: `number`<br>
Default: `4000`

### webpack

Type: `function`

The full `webpack` function arguments:

- `cfg`: current webpack config
- `options`: CLI options with some default values
  - `mode`: CLI command, for `tooling dev` the mode is `dev`
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
    }]
  ]
}
```


### externals

Same as webpack's [externals](https://webpack.js.org/configuration/externals/) options.

### adapter

Set `--adapter` here.
