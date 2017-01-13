/* jslint node: true */
/* jshint asi: true */
'use strict'

const net = require('net')
const util = require('util')
const _ = require('underscore')
const EventEmitter = require('events').EventEmitter
const Connection = require('./connection')

const _defaults = require('./defaults')
/**
 * Default configuration
 */

module.exports = Server
util.inherits(Server, EventEmitter)

/**
 * Server
 *
 * @param {Object} Server setup options
 * @api public
 */
function Server(options) {
  this._options = _.extend(_defaults, options)
  EventEmitter.call(this)
}

/**
 * Listen for requests
 */
Server.prototype.listen = function (port, callback) {
    this._server = net.createServer(this._handleConnection.bind(this))
    this._server.listen(port, callback)
}

/**
 * Handle connection
 *
 * @param {Object} Socket connection
 */
Server.prototype._handleConnection = function(socket) {
    var connection = new Connection(socket, _defaults)
    this.emit('connection', connection)
}


Server.prototype.stop = function () {
    this._server.close()
}

/**
 * Return the configuration used
 */
Server.prototype.config = function () {
    return this._options
}
