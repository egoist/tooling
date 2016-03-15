<p align="center">
	<img src="media/tooling-logo.png" height="100"/>
</p>

<p align="center">
	<a href="https://www.npmjs.com/package/tooling"><img src="https://img.shields.io/npm/v/tooling.svg" alt="version" style="max-width:100%;"></a>
	<a href="https://www.npmjs.com/package/tooling"><img src="https://img.shields.io/npm/dm/tooling.svg" alt="npm" style="max-width:100%;"></a>
	<a href="https://travis-ci.org/egoist/tooling"><img src="https://img.shields.io/travis/egoist/tooling/master.svg" alt="Travis branch" style="max-width:100%;"></a>
</p>

<p align="center">
	<a href="https://gitter.im/egoist/tooling?utm_source=badge&amp;utm_medium=badge&amp;utm_campaign=pr-badge&amp;utm_content=badge"><img src="https://badges.gitter.im/egoist/tooling.svg" alt="Join the chat at https://gitter.im/egoist/tooling" style="max-width:100%;"></a>
	<a href="" target="_blank"><img src="https://img.shields.io/badge/actively%20maintained-yes-ff69b4.svg" alt="extra" style="max-width:100%;"></a>
	<a href="https://david-dm.org/egoist/tooling"><img src="https://img.shields.io/david/egoist/tooling.svg" alt="David"></a>
</p>

## Purpose

You always need to configure webpack for each of your projects, drop `webpack.config.dev.js` `webpack.config.prod.js` for development and production envs. Install tons of common modules like loaders and frameworks. Tooling is just an apporach to skip that verbose procedure.

## Technologies

What `tooling` supports (which means you don't have to install these dependencies yourself):

- Webpack
- [Babel 6 + Stage-0 + Runtime + Polyfill](https://github.com/egoist/tooling/wiki/Using-ES6-via-Babel)
- React with JSX
- Vue/Vue-loader
- [PostCSS/css-modules/cssnext](https://github.com/egoist/tooling/wiki/Using-CSS-via-PostCSS)
- Autoprefixer
- Hot reloading
- BrowserSync
- Custom HTML template
- Build or Watch
- Long-term caching
- [Custom format, iife/umd/commonjs](https://github.com/egoist/tooling/wiki/UMD-CommonJS)
- [Extend the webpack config!](https://github.com/egoist/tooling#extend-default-config)

Real world example, run `npm start` in [this repo](https://github.com/egoist/how-often) or [try it out](/try-it-out.md) 👉

## Install

Installing `tooling` via NPM is easy (**WARN: only work for Node.js >= 4 and NPM@3**):

```bash
$ npm install tooling -g
```

## Workflow

**Initial an awesome web app**

```bash
$ mkdir -p awesome-web-app/src
$ cd awesome-web-app
$ npm init # if you don't have a package.json
$ tooling init react # tooling init [type], default is vue
```

**Start hacking**

```bash
$ editor src/index.jsx
```

```js
import React, { Component } from 'react'
import { render } from 'react-dom'

class Counter extends Component {
	constructor () {
		super()
		this.state = {
			count: 0
		}
	}
	handleClick () {
		this.setState({
			count: this.state.count + 1
		})
	}
	render () {
		return <div onClick={this.handleClick.bind(this)}>{this.state.count}</div>
	}
}

render(<Counter/>, document.querySelector('app'))
```

**You're all set, bring it up!**

```bash
$ npm run watch
```

**deploy to `gh-pages`**

```bash
$ npm i -g gh-pages
$ gh-pages -d build
```

**Run `tooling -h` `tooling watch -h` `tooling build -h` to see more option usages.**

**Set up custom index.html in `package.json`**. see usage at [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin)

```json
{
	"name": "My tooling app",
	"tooling": {
	    "index": {
	      "title": "tooling index",
	      "template": "src/index.jade"
	    }
	}
}
```

If it's complex to configure via CLI arguments (like multi entry), feel free to set in `package.json`.

## Extend default config

Sometimes settings in `package.json` is not powerful enough, you can extend the webpack.config.js that Tooling uses to build your app by simply dropping `tooling.js` in your project directory:

```js
/**
 * @param {Object} config - webpack config which merged cli options and settings in package.json
 * @param {Object} options - cli arguments
 * @return {Object} config - new webpack config
 */
export default function (config, options) {
	config.entry = './some/else/entry.js'
	config.postcss.push(require('new postcss plugins'))
	return config

	// or if you like object spreading...
	return {
		...config,
		entry: 'something else'
	}
}
```

Protip: You can require a module here without installing it if it's Tooling's dependency, since we added a [require path](https://github.com/egoist/tooling/blob/master/lib%2FassignConfig.js#L13-L15). eg: require `webpack` to use its plugins.

---

For advanced usage: [Wiki](https://github.com/egoist/tooling/wiki)

## Related

- (Chinese) [文章: tooling 让你从 jQuery 中解脱出来](https://egoistian.com/2016/01/19/tooling-free-you-from-jquery/)

## License

MIT © [EGOIST](https://github.com/egoist)
