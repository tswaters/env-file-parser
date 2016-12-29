# env-file-parser

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
