# Try It Out

## Use `tooling` to prototype a Vue demo

[Watch Video(no sound) on Youtube!](https://www.youtube.com/watch?v=_odq2Sc1Sko)

## Use `tooling` to prototype a React demo

### Install `tooling`

```bash
npm install -g tooling
# it takes a long time, use --verbose to decrease your anxiety.
```

### Create the demo

```bash
mkdir react-demo && cd react-demo
subl index.js
# grab the following code into this file or just write yourself.
```

```javascript
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

### Make it happen

You're all set! Run `tooling watch --entry index --use react` to start prototyping.

Remember what, `hot reloading` is enabled!

*only `react` and `react-dom` are brought by `tooling`. If you wanna use other libraries you have to install them yourself.*
