'use strict'

const should = require('chai').should
const expect = require('chai').expect
const assert = require('chai').assert
const sinon = require('sinon')
const net = require('net')

const Protocol = require('../lib/protocol')

describe('Protocol', function () {
  describe('Client connection/disconnection', function () {

    let noop = () => {}
    it('emit client connected event', function (done) {
      let duplexify = require('duplexify')
      let stream = require('stream')

      let protocol = new Protocol({remove: noop},
        duplexify(stream.writable, stream.readable))
      let spy = sinon.spy()

      protocol.on('clientConnected', spy)
      protocol._onConnect({cmd: 'connect', clean: 1})

      assert.equal(spy.calledWith(true), true)

      done()
    })
  })
})
