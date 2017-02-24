# tooling-preset-web

What this preset does:

- Generate `index.html` and relevant assets files
- Copy `./static/**` to `./dist/**`
- CSS preprocessors (Postcss/Sass/Scss/Less/Stylus)
- CSS extraction
- Babel with `babel-preset-latest`
- Minimize and optimize in `tooling build`
- Hot reloading (Live loading fallbacks) in `tooling dev`

## Install

```bash
yarn add tooling-preset-web --dev
```

## Usage

```js
{
  "tooling": {
    "presets": [
      "web"
    ]
  }
}
```

You can also use options:

```js
{
  "tooling": {
    "presets": [
      ["web", {
        "entry": "src/index.js"
      }]
    ]
  }
}
```

## Options

### entry

Type: `string`<br>
Default: `index.js`

Entry file.

### dist

Type: `string`<br>
Default: `dist`

Dist folder.

### extract

Type: `boolean`<br>
Default: `true` in `tooling build`

Extract CSS.

### sourceMap

Type: `boolean`<br>
Default: `true` in `tooling build`

Generate sourcemaps.

### html

[html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin) options,
the default value is:

```js
{
  title: 'Tooling Preset Web: Homepage'
}
```
