# tooling 

[![version](https://img.shields.io/npm/v/tooling.svg)](https://www.npmjs.com/package/tooling)
[![npm](https://img.shields.io/npm/dm/tooling.svg)](https://www.npmjs.com/package/tooling)
[![Join the chat at https://gitter.im/egoist/tooling](https://badges.gitter.im/egoist/tooling.svg)](https://gitter.im/egoist/tooling?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
![extra](https://img.shields.io/badge/actively%20maintained-yes-ff69b4.svg)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

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

[Try It Out](/try-it-out.md) 👉

## Usage

Installing `tooling` via NPM is easy (`node` >= 4.0.0):

```bash
npm install tooling -g
```

Build a project in production mode:

```bash
# default entry is ./src/index
tooling build --entry [entry]
```

Run dev server with hot reloading:

```bash
# default entry is ./src/index
tooling watch --entry [entry]
```

Options:

|Argument|Description|
|---|---|
|-e/--entry|Set webpack entry, currently single entry only|
|-p/--port|devServer port, available in watch mode|
|-bs/--browsersync|Enable browserSync at port 23789|
|-s/--silent|Do not open browser window when running devServer (not work if you enable browserSync)|

**Set up custom index.html in `package.json`**. see usage at [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin) 

```
{
	"name": "My tooling app",
	"tooling": {
	    "index": {
	      "title": "tooling index",
	      "template": "src/index.template"
	    }
	}
}
```

For advanced usage: [Wiki](https://github.com/egoist/tooling/wiki)

## API

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

## License

MIT © [EGOIST](https://github.com/egoist)
