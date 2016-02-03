import React, { Component } from 'react'
import { render } from 'react-dom'
import './fixture'

class Counter extends Component {
    constructor() {
        super()
        this.state = {
            count: 0
        }
    }
    handleClick() {
        this.setState({
            count: this.state.count + 2
        })
    }
    render() {
        return (
					<div>
						<div className="logo"></div>
						<button onClick={this.handleClick.bind(this)}>{this.state.count}</button>
					</div>
				)
    }
}

render(<Counter/>, document.querySelector('app'))
