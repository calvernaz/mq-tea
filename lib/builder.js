'use strict';
/**
 * Builder
 */

const Connection = require('mqtt-connection')
const Session = require('./session')

exports.connection = function (socket) {
  return new Connection(socket)
}

exports.session = function (connectPacket) {
  return new Session(connectPacket)
}
