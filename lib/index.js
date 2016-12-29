'use strict'

const fs = require('fs')
const parser = require('./parse')

module.exports.parse = function (file, options, cb) {

  if (arguments.length === 2 && typeof arguments[1] === 'function') {
    cb = arguments[1]
    options = null
  }

  return new Promise((resolve, reject) => {
    fs.readFile(file, options, (err, result) => {
      if (err && cb) { return cb(err) }
      if (err) { return reject(err) }

      const res = parser(result)

      if (cb) { return cb(null, res) }
      resolve(res)
    })
  })
}


module.exports.parseSync = (file, options) =>
  parser(fs.readFileSync(file, options))
