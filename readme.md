<p align="center">
	<img src="example/tooling-logo.png" height="100"/>
</p>

<p align="center">
	<a href="https://www.npmjs.com/package/tooling"><img src="https://img.shields.io/npm/v/tooling.svg" alt="version" style="max-width:100%;"></a>
	<a href="https://www.npmjs.com/package/tooling"><img src="https://img.shields.io/npm/dm/tooling.svg" alt="npm" style="max-width:100%;"></a>
	<a href="https://travis-ci.org/egoist/tooling"><img src="https://img.shields.io/travis/egoist/tooling/master.svg" alt="Travis branch" style="max-width:100%;"></a>
</p>

<p align="center">
	<a href="https://gitter.im/egoist/tooling?utm_source=badge&amp;utm_medium=badge&amp;utm_campaign=pr-badge&amp;utm_content=badge"><img src="https://badges.gitter.im/egoist/tooling.svg" alt="Join the chat at https://gitter.im/egoist/tooling" style="max-width:100%;"></a>
	<a href="" target="_blank"><img src="https://img.shields.io/badge/actively%20maintained-yes-ff69b4.svg" alt="extra" style="max-width:100%;"></a>
	<a href="https://github.com/semantic-release/semantic-release"><img src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg" alt="semantic-release" style="max-width:100%;"></a>
</p>

## Purpose

You always need to configure webpack for each of your projects, drop `webpack.config.dev.js` `webpack.config.prod.js` for development and production envs. Install tons of common modules like loaders and frameworks. Tooling is just an apporach to skip that verbose procedure.

## Technologies

What `tooling` supports (which means you don't have to install these dependencies yourself):

- Webpack
- Babel 6 + Stage-0 + Runtime
- React with JSX
- Vue
- Vue-loader
- PostCSS with PreCSS
- Autoprefixer
- Hot reloading
- BrowserSync
- Custom HTML template
- Build or Watch
- Long-term caching

Real world example, run `npm start` in [this repo](https://github.com/egoist/how-often) or [try it out](/try-it-out.md) 👉

## Usage

Installing `tooling` via NPM is easy (**WARN: only work for Node.js >= 4**):

```bash
npm install tooling -g
```

Build a project in production mode:

```bash
# default entry is ./src/index
# in this case we use Vue in our app
tooling build --entry [entry]

# multi entry support
--entry example # => example[.ext] or example/index[.ext]
--entry app.js,app.css # => ['app.js', 'app.css']
--entry js:app.js,css:app.css # => {js: 'app.js', css: 'app.css'}
```

Run dev server with hot reloading:

```bash
# default entry is ./src/index
# in this case we use React in our app
tooling watch --entry [entry] --use react
```

Run `tooling -h` `tooling watch -h` `tooling build -h` to see more usages.

**Set up custom index.html in `package.json`**. see usage at [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin)

```
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

For advanced usage: [Wiki](https://github.com/egoist/tooling/wiki)

## API

**WIP.**

```bash
npm install tooling --save
```

```javascript
import tooling from 'tooling'

/**
 * Tooling
 *
 * @param {string} type - 'watch' or 'build'
 * @param {object} options - options for webpack,
 * 					    - override the default settings.
 *				 options.port - available in 'watch' mode
 *							  - to set the port devServer should run at
 */
tooling(type, options)
```

## Related

- (Chinese) [文章: tooling 让你从 jQuery 中解脱出来](https://egoistian.com/2016/01/19/tooling-free-you-from-jquery/)

## License

MIT © [EGOIST](https://github.com/egoist)
