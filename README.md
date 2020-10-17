# tooling

[![NPM version](https://img.shields.io/npm/v/tooling.svg?style=flat)](https://npmjs.com/package/tooling) [![NPM downloads](https://img.shields.io/npm/dm/tooling.svg?style=flat)](https://npmjs.com/package/tooling) [![Build Status](https://img.shields.io/circleci/project/egoist/tooling/master.svg?style=flat)](https://circleci.com/gh/egoist/tooling) [![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/egoist/donate)

## Install

```bash
yarn add tooling tooling-preset-web --dev
```

## How to use

Configure npm scripts:

```js
{
  "scripts": {
    "build": "tooling build",
    "dev": "tooling dev"
  },
  "tooling": {
    "presets": [
      "web"
    ]
  }
}
```

Populate `index.js` inside your project:

```js
document.write('<h1>Hello World!<h1>')
```

And run `yarn dev` and go to `http://localhost:4000`.

## Command

- `tooling dev`: Run dev server with hot reloading support, then you can code as per required and open up browser to preview changes.
- `tooling build`: Build app in production mode.

## Configuration

The surprise is, tooling requires **no configurations!** Oh well, there're a couple CLI options. You can run `tooling --help` and `tooling <command> --help` to check out!

However, `presets` may require options, so you can configure them in:

- a package.json's `tooling` property
- a JSON or YAML "rc file", eg: `.toolingrc.json` or `.toolingrc.yml` or without extension
- a `tooling.config.js` CommonJS module
- a CLI `--config` argument

## Presets

Your app is driven by presets under the hood, just like [babel](https://babeljs.io) is driven by babel presets.

### List of presets

- [Web](./packages/tooling-preset-web): A preset you'll need for modern web apps.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Author

**tooling** © [egoist](https://github.com/egoist), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by egoist with help of contributors ([list](https://github.com/egoist/tooling/contributors)).

> [egoistian.com](https://egoistian.com) · GitHub [@egoist](https://github.com/egoist) · Twitter [@rem_rin_rin](https://twitter.com/rem_rin_rin)
