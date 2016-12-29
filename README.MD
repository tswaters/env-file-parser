# env-file-parser

[![npm version][npm-badge]][npm-url]
[![Build Status][travis-badge]][travis-url]
[![Coverage Status][coveralls-badge]][coveralls-url]
[![Dependency Status][david-badge]][david-url]

Parses an env file into a plain object.

## Example

```js

// ./file.env
// it works = true
// # it most definitely does.

// ./file.js
const {parse} = require('env-file-parser')
parser('./file.env').then(result => {
  assert.deepEqual(result, {'it works': true})
})
```

## Env files

* Whitespace is trimmed from values
* You can include quotes around values to include whitespace
* Comments start with a `#`
* Blank lines are ignored
* true/false values are parsed into booleans

## API

* *parse* parses the provided file, returns a promise resolved to a plain object
* *parseSync* parses the provided file, returns a plain object

In all cases, fs errors will be thrown back to you and no sanity check is done on input arguments.
Give me junk, and junk you shall receive.

**arguments**:

- {string} filePath -  will be passed to the fs module to load the file. toString will be called on the result
- {object} [options] - will be passed to readFile / readFileSync call
- {function} [callback] - you can use node-style callbacks as well (`parse` only)

## License

MIT

[npm-badge]: https://badge.fury.io/js/env-file-parser.svg
[npm-url]: https://badge.fury.io/js/env-file-parser
[travis-badge]: https://travis-ci.org/tswaters/env-file-parser.svg?branch=master
[travis-url]: https://travis-ci.org/tswaters/env-file-parser
[coveralls-badge]: https://coveralls.io/repos/github/tswaters/env-file-parser/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/tswaters/env-file-parser?branch=master
[david-badge]: https://david-dm.org/tswaters/env-file-parser.svg
[david-url]: https://david-dm.org/tswaters/env-file-parser