# tooling 

[![version](https://img.shields.io/npm/v/tooling.svg)](https://www.npmjs.com/package/tooling)
[![npm](https://img.shields.io/npm/dm/tooling.svg)](https://www.npmjs.com/package/tooling)
[![Join the chat at https://gitter.im/egoist/tooling](https://badges.gitter.im/egoist/tooling.svg)](https://gitter.im/egoist/tooling?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
![extra](https://img.shields.io/badge/actively%20maintained-yes-ff69b4.svg)

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
- Build or Watch
- Long-term caching

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
|--entry|Set webpack entry, currently single entry only|
|--port|devServer port, available in watch mode|
|--browsersync|Enable browserSync at port 23789|
|--silent|Do not open browser window when running devServer (not work if you enable browserSync)|

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
