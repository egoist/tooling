<div align="center">
  <img src="https://cdn.rawgit.com/egoist/fa2efce43aa2f62e39bbc363bf2240b7/raw/c17a8a5bf5981c32d7b38bbf2dcd88866ef1c8b1/gear.svg" alt="">
  <br><strong>tooling</strong> is an ultra simple<br> build tool for JavaScript apps.
</div>

## tl;dr

```bash
$ npm install -g tooling

# initialize an empty project
$ tooling init my-project
# or a react project
$ tooling init my-project --react
```

## Install

Recommend: ` node >= 4 ` `npm >= 3`

```bash
$ npm install -g tooling
```

## Usage

```bash
# live reloading
$ tooling --live

# build for production use
$ tooling -p

$ tooling --help
$ tooling init --help
```

## Recipes

- [Create React App](/recipes/react-app.md)

## Features

### Webpack

Webpack is the bundler **tooling** used under the hood. We will switch to Webpack 2 as soon as it's stable.

### Babel

JS files are transformed by Babel with preset `es2015` and `stage-1`, which means all ES6/7 and stage-1 features are supported.

### HTML

By default **tooling** generates an `index.html` with `<div id="app"></div>` in `body` element for you, and all bundled scripts are automatically injected to the HTML. By passing arg `--no-html` to disable this behavior.

### CSS

CSS files are transformed by PostCSS.

## Advanced configuration

Create a `tooling.config.js` in your project root directory:

```js
/**
 * Override CLI options
 * @param  {Object} options - CLI options
 * @return {Object}
 */
export default options => {
  // override default options with ⬇️⬇️
  return {
    // all the simple options that are listed in CLI help message.
    entry, port, live, react, // ...

    // other complex options, like Object, Array and Function
    // babel options
    babel,
    // postcss plugins
    postcss,
    // autoprefixer browsers, only works when you didn't override postcss plugins
    browsers
  }
}
```

**Protip**: You don't have to install modules that are already installed by **tooling**, like `webpack` and some `postcss/babel` plugins.

## License

MIT © [EGOIST](https://github.com/egoist)
