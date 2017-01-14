/*jslint node: true */
/*jshint asi: true */
'use strict';

const debug = require('debug')('mq-tea')
const mqtt = require('mqtt-packet')

/**
* This class is responsible for parsing data from socket
*
* @class Parser
* @param {Object} config
* @constructor
*/
module.exports = Parser
function Parser(config) {
  this._onPacketDecoded = config.onPacketDecoded

  this._parser = mqtt.parser()
  this._parser.on('packet', this._onPacket.bind(this))
  this._parser.on('error', this._onPacketError.bind(this))
}


/**
 * Write the message to the internal buffer,
 * parse delimiters and call method onMessage.
 *
 * @return an {String} without delimiters
 * @api public
 */
Parser.prototype.write = function(buffer) {
  this._parser.parse(buffer)
}


Parser.prototype._onPacket = function(packet) {
  debug(packet)
  this._onPacketDecoded(packet)
}

Parser.prototype._onPacketError = function(error) {
  debug(error)
}
