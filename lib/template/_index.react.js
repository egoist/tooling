import React from 'react'
import {render} from 'react-dom'

const projectName = "<$ projectName $>"

const styles = {
  container: {
    fontFamily: 'Helvetica',
    maxWidth: '600px',
    margin: '0 auto'
  }
}

const App = props => (
  <div style={styles.container}>
    <h1>{props.projectName}</h1>
    <div className="main">
      <p>
        Hi there, you've made a perfect start using tooling!
      </p>
      <p>
        Check out <strong>README.md</strong> or head to <a href="https://github.com/egoist/tooling">tooling</a> to get more instructions.
      </p>
    </div>
  </div>
)

render(
  <App projectName={projectName} />,
  document.getElementById('app')
)
