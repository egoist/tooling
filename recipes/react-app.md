# Create React App

Create a new project, install dependencies.

```bash
$ mkdir react-project && cd react-project

$ npm install react react-dom
```

Create an entry file named `index.js`:

```js
import React, {Component} from 'react'
import {render} from 'react-dom'

const Counter = props => <button>{props.count}</button>

render(<Counter count="0" />, document.getElementById('app'))
```

## Run it in development mode

```bash
$ tooling --react --live
# react with live reloading, that's it
```

## Build for production use

```bash
$ tooling --react -p
```
