# Config file

## Use a config file

An example `config.js`:

```js
module.exports = {
  port: 3000,
  webpack(cfg, options, webpack) {
    // update cfg
    return cfg
  }
}
```

Then load it:

```bash
yarn tooling build index.js --config config.js
```
