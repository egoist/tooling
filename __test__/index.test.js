const fs = require('fs')
const path = require('path')
const spawn = require('cross-spawn')
const tooling = require('../')

describe('build', () => {
  let files
  let proc
  let cwd = process.cwd()

  const cli = path.join(__dirname, '../bin/tooling')

  function setup() {
    process.chdir('__test__/fixture')
  }

  function teardown() {
    spawn.sync('rm', ['-rf', 'dist'])
    process.chdir(cwd)
  }

  beforeAll(() => {
    setup()
    proc = spawn.sync(cli, ['build', 'index.js'])
    files = fs.readdirSync('dist')
  })

  afterAll(teardown)

  it('set correct status code', () => {
    expect(proc.status).toBe(0)
  })

  it('generate correct files', () => {
    expect(files.length).toBe(3)
  })
})
