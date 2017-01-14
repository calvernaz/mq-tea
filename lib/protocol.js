/*jslint node: true */
/*jshint asi: true */
'use strict';

const debug = require('debug')('mq-tea')
const util = require('util')
const stream = require('stream')
const mqtt = require('mqtt-packet')

module.exports = Protocol
util.inherits(Protocol, stream)

/**
 * Protocol
 *
 * @param {Object} Server setup options
 * @api public
 */
function Protocol(options) {
  stream.call(this)

  this.readable = true;
  this.writable = true;

  this.connection = options.connection
  this._parser = mqtt.parser()

  this._parser.on('packet', this._onPacket.bind(this))
  this._parser.on('error', this._onPacketError.bind(this))
}


/**
 * When data arrives, this method is called
 *
 * @param {String} containing the data in the socket
 * @api public
 */
Protocol.prototype.write = function(buffer) {
  debug('Left bytes: %s', this._parser.parse(buffer))
}


Protocol.prototype._onPacket = function(packet) {
  debug(packet)
}

Protocol.prototype._onPacketError = function(error) {
  debug(error)
}
