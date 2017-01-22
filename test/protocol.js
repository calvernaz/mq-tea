'use strict'

const should = require('chai').should
const expect = require('chai').expect
const assert = require('chai').assert
const sinon = require('sinon')
const net = require('net')

const Protocol = require('../lib/protocol')
const Connection = require('mqtt-connection')

describe('Protocol', function () {
  describe('Client connection/disconnection', function () {
    it('emit client connected event', function (done) {
      let duplexify = require('duplexify')
      let stream = require('stream')

      let protocol = new Protocol(Connection(duplexify(stream.writable, stream.readable)))
      let spy = sinon.spy()

      protocol.on('clientConnected', spy)
      protocol._onConnect({ cmd: 'connect' })

      assert.equal(spy.calledWith({ cmd: 'connect'}), true)
      
      done()
    })
  })
})
