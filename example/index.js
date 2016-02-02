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
        return <button onClick={this.handleClick.bind(this)}>{this.state.count}</button>
    }
}

render(<Counter/>, document.querySelector('app'))
