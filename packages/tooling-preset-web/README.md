# tooling-preset-web

What this preset does:

- Generate `index.html` and relevant assets files
- Copy `./static/**` to `./dist/**`
- CSS preprocessors (Postcss/Sass/Scss/Less/Stylus)
- CSS extraction
- Babel with `babel-preset-latest`
- Hot reloading (Live loading fallbacks) in `dev` command
- Minimize and optimize in `build` command
- Auto-split vendor code and app code in `build` command

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
Default: `true` in `build` command

Extract CSS.

### sourceMap

Type: `boolean`<br>
Default: `true` in `build` command

Generate sourcemaps.

### html

[html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin) options,
the default value is:

```js
{
  title: 'Tooling Preset Web: Homepage'
}
```

### vendor

Type: `boolean`<br>
Default: `true` in `build` command and only work in `build` command

Split vendor code and app code.
