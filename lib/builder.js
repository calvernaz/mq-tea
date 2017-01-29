'use strict';
/**
 * Builder
 */

const Connection = require('mqtt-connection')
const Session = require('./session')
const Broker = require('./broker')

exports.connection = function (socket) {
  return new Connection(socket)
}

exports.session = function (connectPacket) {
  return new Session(connectPacket)
}

exports.broker = function() {
  return new Broker()
}