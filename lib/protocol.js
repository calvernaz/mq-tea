/*jslint node: true */
/*jshint asi: true */
'use strict';

const debug = require('debug')('mq-tea')
const util = require('util')
const Stream = require('stream')
const Parser = require('./parser')
const Decoder = require('./decoder')
const Sequences = require('./sequences')
const mqtt = require('mqtt-packet')

module.exports = Protocol
util.inherits(Protocol, Stream)

/**
 * Protocol
 *
 * @param {Object} Server setup options
 * @api public
 */
function Protocol(options) {
  Stream.call(this)

  this._queue = []

  this.readable = true
  this.writable = true

  this.connection = options.connection
  this._parser = new Parser({ onPacketDecoded: this._onPacketDecoded.bind(this) })
  this._decoder = new Decoder();
}

/**
 * Authentication handshake handler
 *
 * @param {Function} callback to be called when event
 *        'handshake' is emitted
 * @api public
 */
Protocol.prototype.connectionEstablished = function() {
  return this._enqueue(new Sequences.Connect())
}


/**
 * When data arrives, this method is called
 *
 * @param {String} containing the data in the socket
 * @api public
 */
Protocol.prototype.write = function(buffer) {
  this._parser.write(buffer)
}

/**
 * Writes the message to socket.
 * The event 'data' is emitted, making the stream flush data to socket.
 *
 * @param {String} ASCII string defined in the Telemetry Design Manual
 */
Protocol.prototype._emitMessage = function(message) {
  this.emit('data', message)
}

/**
 * Parses the message already queued.
 */
Protocol.prototype._onPacketDecoded = function(packet) {
  let sequence = this._decoder.lookup(packet.cmd)
  this._emitMessage(mqtt.generate({
    cmd: 'connack',
    returnCode: 0, // Or whatever else you see fit
    sessionPresent: false // Can also be true.
  }))
}
