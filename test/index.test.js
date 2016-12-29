'use strict'

const fs = require('fs')
const assert = require('assert')
const sinon = require('sinon')

const index = require('../lib')
const expected = require('./fixtures/expected.json')

const filePath = './test/fixtures/fixture.env'
const options = {encoding: 'utf8'}
const fileContents = fs.readFileSync(filePath, options)

describe('env parser api', () => {

  let readFileStub = null
  let readFileSyncStub = null

  beforeEach(() => {
    readFileStub = sinon.stub(fs, 'readFile')
    readFileSyncStub = sinon.stub(fs, 'readFileSync')
  })

  afterEach(() => {
    readFileStub.restore()
    readFileSyncStub.restore()
  })

  describe('parse - promises', () => {
    it('should respond to errors properly', () => {
      readFileStub.callsArgWith(2, new Error('aw snap!'))
      return index.parse(filePath).then(() => { throw new Error()})
      .catch(err => {
        assert.equal(readFileStub.callCount, 1)
        assert.equal(readFileStub.firstCall.args[0], filePath)
        assert.equal(readFileStub.firstCall.args[1], null)
        assert.equal(err.message, 'aw snap!')
      })
    })
    it('should return promises properly', () => {
      readFileStub.callsArgWith(2, null, fileContents)
      return index.parse(filePath).then(actual => {
        assert.equal(readFileStub.callCount, 1)
        assert.equal(readFileStub.firstCall.args[0], filePath)
        assert.equal(readFileStub.firstCall.args[1], null)
        assert.deepEqual(actual, expected)
      })
    })
    it('should return promises and act upon options properly', () => {
      readFileStub.callsArgWith(2, null, fileContents)
      index.parse(filePath, options).then(actual => {
        assert.equal(readFileStub.callCount, 1)
        assert.equal(readFileStub.firstCall.args[0], filePath)
        assert.deepEqual(readFileStub.firstCall.args[1], options)
        assert.deepEqual(actual, expected)
      })
    })
  })

  describe('parse - callbacks', () => {
    it('should handle errors properly', done => {
      readFileStub.callsArgWith(2, new Error('aw snap!'))
      index.parse(filePath, (err, actual) => {
        assert.equal(readFileStub.callCount, 1)
        assert.equal(readFileStub.firstCall.args[0], filePath)
        assert.equal(readFileStub.firstCall.args[1], null)
        assert.equal(err.message, 'aw snap!')
        assert.deepEqual(actual, null)
        done()
      })
    })
    it('should act on callbacks properly', done => {
      readFileStub.callsArgWith(2, null, fileContents)
      index.parse(filePath, (err, actual) => {
        assert.equal(readFileStub.callCount, 1)
        assert.equal(readFileStub.firstCall.args[0], filePath)
        assert.equal(readFileStub.firstCall.args[1], null)
        assert.equal(err, null)
        assert.deepEqual(actual, expected)
        done()
      })
    })
    it('should act on callbacks with options', done => {
      readFileStub.callsArgWith(2, null, fileContents)
      index.parse(filePath, options, (err, actual) => {
        assert.equal(readFileStub.callCount, 1)
        assert.equal(readFileStub.firstCall.args[0], filePath)
        assert.deepEqual(readFileStub.firstCall.args[1], options)
        assert.equal(err, null)
        assert.deepEqual(actual, expected)
        done()
      })
    })
  })

  describe('parse sync', () => {
    it('should act syncronously properly - no options', () => {
      readFileSyncStub.returns(fileContents)
      const actual = index.parseSync(filePath)
      assert.deepEqual(actual, expected)
      assert.equal(readFileSyncStub.callCount, 1)
      assert.equal(readFileSyncStub.firstCall.args[0], filePath)
      assert.equal(readFileSyncStub.firstCall.args[1], null)
    })
    it('should act syncronously properly - options', () => {
      readFileSyncStub.returns(fileContents)
      const actual = index.parseSync(filePath, options)
      assert.deepEqual(actual, expected)
      assert.equal(readFileSyncStub.callCount, 1)
      assert.equal(readFileSyncStub.firstCall.args[0], filePath)
      assert.deepEqual(readFileSyncStub.firstCall.args[1], options)
    })
  })

})
