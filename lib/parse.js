'use strict'

module.exports = contents =>

  // make sure this isn't a buffer
  contents.toString()

  // split on new line
  .split(/\r?\n|\r/)

  // filter comments
  .filter(line => /^[^#]/.test(line))

  // needs equal sign
  .filter(line => /=/i.test(line))

  // turn lines into plain object
  .reduce((memo, line) => {

    // pull out key/values (value can have spaces, remove quotes)
    const kv = line.match(/^([^=]+)=(.*)$/)
    const key = kv[1].trim()
    const val = kv[2].trim().replace(/['"]/g, '')

    // parse the return value into js objects
    const ret = val.toLowerCase() === 'true'
      ? true
      : val.toLowerCase() === 'false'
        ? false
        : val

    memo[key] = ret
    return memo

  }, {})
