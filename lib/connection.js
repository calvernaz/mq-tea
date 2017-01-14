/* jslint node: true */
/* jshint asi: true */
'use strict'

const util = require('util')
const _ = require('underscore')
const Protocol = require('./protocol')
const EventEmitter = require('events').EventEmitter

module.exports = Connection

util.inherits(Connection, EventEmitter)
function Connection (socket, options) {
  this._socket = socket;
  this._options = _.extend({}, options)
  this._protocol  = new Protocol({config: this._options, connection: socket})

  this._socket.pipe(this._protocol)
  this._protocol.pipe(this._socket)

  EventEmitter.call(this)
}
