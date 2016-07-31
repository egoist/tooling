<div align="center">
  <br><strong>tooling</strong> is an ultra simple<br> build tool for JavaScript apps.
</div>

<h2></h2>

### Webpack

Webpack is the bundler **tooling** used under the hood. We will switch to Webpack 2 as soon as it's stable.

### Babel

JS files are transformed by Babel with preset `es2015` and `stage-1`, which means all ES6/7 and stage-1 features are supported.

### HTML

By default **tooling** generates an `index.html` with `<div id="app"></div>` in `body` element for you, and all bundled scripts are automatically injected to the HTML. By passing arg `--no-html` to disable this behavior.

### CSS

CSS files are transformed by PostCSS, and `CSS modules` are enabled by default.

## Install

```bash
$ npm install -g tooling
```

## Usage

```bash
# the default entry is index.js
$ tooling # equal to
$ tooling index.js

# build for production use
$ tooling -p

$ tooling --help
```

## License

MIT © [EGOIST](https://github.com/egoist)
