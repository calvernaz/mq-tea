'use strict'

const should = require('chai').should
const expect = require('chai').expect

const net = require('net')

const Server = require('../lib/server')
const _defaults = require('../lib/defaults.js')

describe('Server', function () {
  describe('Setup', function () {
    var server;

    before(function() {
      if (server)
        server.stop()
    });

    it('should use default configuration', function () {
      server = new Server(null)
      expect(server.config()).to.deep.equal(_defaults)
    })

    it('should override default configuration', function () {
      server = new Server({ port: 5005 })
      expect(server.config()).to.deep.equal({ port: 5005 })
    })

  })
})
