# tooling

[![NPM version](https://img.shields.io/npm/v/tooling.svg?style=flat)](https://npmjs.com/package/tooling) [![NPM downloads](https://img.shields.io/npm/dm/tooling.svg?style=flat)](https://npmjs.com/package/tooling) [![Build Status](https://img.shields.io/circleci/project/egoist/tooling/master.svg?style=flat)](https://circleci.com/gh/egoist/tooling) [![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/egoist/donate)

## Install

Recommend to install `tooling` as devDependency in your project, however you can still install it globally if you like.

```bash
yarn add tooling --dev
```

Note that you can execute `./node_modules/.bin/tooling` via `yarn tooling`

## Getting started

First populate an entry file `index.js` in your project:

```js
setInterval(() => {
  document.body.innerHTML = new Date()
}, 1000)
```

**Development mode:**

```bash
yarn tooling dev index.js
```

Then open `http://localhost:4000` and test it out yourself!

**Production mode: (minified and optimized)**

```bash
yarn tooling build index.js
```

Then you can deploy generated files in `./dist` folder.

## What's inside?

### Babel

Babel with `babel-preset-latest` for transpiling ES2015+ code, you can override it by providing `.babelrc` in your project root.

### PostCSS

The Default postcss plugins only contain the `autoprefixer` with `browsers: ['ie > 8', 'last 4 versions']`, you can override it by providing `postcss.config.js` in your project root.

### Static folder

By default `./static` will be copied to `./dist/static`, thus all resource in the static folder can be accessible via `/static/path/to/resource`.

## Adapter

An adapter can mutate the webpack config tooling uses, it's often used to adapt specific framework like `react` and `vue`.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Author

**tooling** © [egoist](https://github.com/egoist), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by egoist with help from contributors ([list](https://github.com/egoist/tooling/contributors)).

> [egoistian.com](https://egoistian.com) · GitHub [@egoist](https://github.com/egoist) · Twitter [@rem_rin_rin](https://twitter.com/rem_rin_rin)
