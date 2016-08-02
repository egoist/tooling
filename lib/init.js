'use strict'
const path = require('path')
const co = require('co')
const fs = require('fs-promise')
const globby = require('globby')
const move = require('./move')

module.exports = co.wrap(function * (projectName, options) {
  if (!projectName) {
    console.log('Please specific the name of your new project.')
    return
  }
  const templateData = Object.assign({projectName}, options)
  console.log(`Initializing a new tooling project at ${projectName}`)
  yield fs.copy(
    path.join(__dirname, 'template'),
    pdir()
  )
  // move package.json
  yield move(
    pdir('_package.json'),
    pdir('package.json'),
    templateData
  )

  // move tooling.config.js
  yield move(
    pdir('_tooling.config.js'),
    pdir('tooling.config.js'),
    templateData
  )

  // move index.js
  if (options.react) {
    yield moveIndex('_index.react.js')
  } else {
    yield moveIndex('_index.js')
  }

  // clean
  console.log('Cleaning files')
  yield globby(['_index*'], {cwd: pdir()}).then(files => {
    return Promise.all(files.map(file => fs.unlink(pdir(file))))
  })

  console.log('Done Initializing project!')
  console.log(`Run the following commands to get started:`)
  console.log(`
  cd ${projectName}
  npm install
  npm start
  `)

  function pdir(fp) {
    return path.resolve(projectName, fp || '')
  }

  function moveIndex(from) {
    return move(
      pdir(from),
      pdir('index.js'),
      templateData
    )
  }
})
