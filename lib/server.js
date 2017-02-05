/* jslint node: true */
/* jshint asi: true */
'use strict'

const debug = require('debug')('mq-tea')

const net = require('net')
const util = require('util')
const EventEmitter = require('events').EventEmitter

const _ = require('underscore')

const _defaults = require('./defaults')
const builder = require('./builder')

const Protocol = require('./protocol')
const SessionStore = require('./session-storage')

module.exports = Server
util.inherits(Server, EventEmitter)

/**
 * Server
 *
 * @param {Object} Server setup options
 * @api public
 */
function Server (options) {
  this._options = _.extend(_defaults, options)
  this._sessionStore = new SessionStore()

  EventEmitter.call(this)
}

/**
 * Listen for requests
 */
Server.prototype.listen = function (cb)
{
  this._server = net.createServer(this._handleConnection.bind(this))
  this._server.listen(this._options, cb)
}

/**
 * Handle connection
 *
 * @param {Object} socket TCP socket
 */
Server.prototype._handleConnection = function (socket)
{
  let connection = builder.connection(socket)
  let protocol = builder.protocol(this._sessionStore, connection);
  protocol.on('clientConnected', this._onClientConnected.bind(this))
  protocol.on('clientDisconnect', this._onClientDisconnected.bind(this))
}

Server.prototype._onClientConnected = function(session) {}

Server.prototype._onClientDisconnected = function(sessionId) {}

Server.prototype.stop = function () {
  this._server.close()
}

/**
 * Return the configuration used
 */
Server.prototype.config = function () {
  return this._options
}
