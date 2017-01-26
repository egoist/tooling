const fs = require('fs')
const path = require('path')
const spawn = require('cross-spawn')
const tooling = require('../')

describe('build', () => {
  let files
  let proc

  beforeAll(() => {
    const cli = path.join(__dirname, '../bin/tooling')
    proc = spawn.sync(cli, ['build', 'index.js'])
    files = fs.readdirSync('dist')
  })

  afterAll(() => {
    spawn.sync('rm', ['-rf', 'dist'])
  })

  it('set correct status code', () => {
    expect(proc.status).toBe(0)
  })

  it('generate correct files', () => {
    expect(files.length).toBe(2)
  })
})
