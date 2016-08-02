# Tooling App

## Development

```bash
$ npm start

# or with live reloading
$ tooling --live
```

## Build

```bash
$ npm run build
```

## Add a stylesheet

Simply import the CSS file you need:

```js
import './style.css'

// ... your app code
```

### `tooling.config.js`

## Override CSS(PostCSS) plugins

```js
export default options => {
  return {
    postcss: [
      require('my-postcss-plugin')
    ]
  }
}
```

## Override JS(Babel) plugins(presets)

```js
export default options => {
  return {
    babel: {
      presets: [
        require('babel-preset-es2015'),
        require('babel-preset-stage-0')
      ]
    }
  }
}
```

## More documentations

Head to https://github.com/egoist/tooling#advanced-configuration
