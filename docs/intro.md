# Introducing Tooling

Tooling is a CLI tool to help you fast developing a JavaScript app.

## Pain Points

|from|why|
|---|---|
|Gulp|Gulp is simply a task runner, no native support for module system, it has to work with something like browserify or webpack. And the `gulpfile.js` would be bloated when your tasks get scalable.|
|Webpack|Very powerful, support almost anything by adding loaders. But the config would be painful for even a power user.|
|Rollup|Great for bundling Node.js libraries, do not have a good support for CSS and images.|

## Solution

**We selected Webpack!** Webpack is almost anything, so we take our first step there. Tooling uses Webpack under the hood by preseting configurations. And providing a simple interface for users to extend it.

## Preset

Tooling is a great for writing (bundling):

- React apps (React with hot reloading, perfect!)
- Vue apps (Vue with hot reloading, sounds good!)
- Regular web apps (Whatever frameworks you use!)
- Node.js libraries (CommonJS/UMD/ES6/Tree shaking, etc...)

## Developer friendly

- Hot reloading for React/Vue/Angular and many popular frameworks...
- Live reloading for regular web apps.
- Browser-sync, great experience for cross-device browser testing.
- Tree-shaking, no un-used code!
- Compressed output, make your app fly higher.
- Latest technologies, Babel/PostCSS is our choice by default.
- Auto-install dependencies, say goodbye to the annoying `npm install xxx` when developing.
