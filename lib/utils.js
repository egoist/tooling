'use strict'
const path = require('path')

var _ = module.exports = {}

_.cwd = fp => path.join(process.cwd(), fp || '')
_.dir = fp => path.join(__dirname ,'../', fp || '')
