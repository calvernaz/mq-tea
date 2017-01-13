'use strict'

const assert = require('chai').assert
const should = require('chai').should
const expect = require('chai').expect
const sinon = require('sinon')

const net = require('net')

const Server = require('../lib/server')
const Connection = require('../lib/connection')

const _defaults = require('../lib/defaults.js')

describe('Server', function() {

    describe('Setup', function() {

        it('should use default configuration', function () {
            var server = new Server(null)
            expect(server.config()).to.deep.equal(_defaults);
        })

        it('should override default configuration', function () {
            var server = new Server({ debug: true })
            expect(server.config()).to.deep.equal({ debug: true, port: 1883 })
        })

        it('should emit a connection', function (done) {
            var server = new Server({ port: 3333 })

            server.on('connection', (conn) => {
                conn.should.have.property("_options")
                server.stop()
                done()
            })

            server.listen(_defaults.port, () => {})
            net.createConnection({ port: 3333 })
        })
    })
})
