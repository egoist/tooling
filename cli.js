#!/usr/bin/env node
'use strict'

const program = require('commander')
const pkg = require('./package')
const watch = require('./commands/watch')
const build = require('./commands/build')

program
	.version(pkg.version)

program
	.command('watch')
	.option("--entry [webpackEntry]", "Set webpack entry")
	.action(watch)

program
	.command('build')
	.option("--entry [webpackEntry]", "Set webpack entry")
	.action(build)

program.parse(process.argv)
