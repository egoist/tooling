'use strict'
const magicalMove = require('magical-move')

module.exports = function (from, to, data) {
  return magicalMove(from, to, data, {
    tags: {
      blockStart: '<%',
      blockEnd: '%>',
      variableStart: '<$',
      variableEnd: '$>',
      commentStart: '<#',
      commentEnd: '#>'
    }
  })
}
