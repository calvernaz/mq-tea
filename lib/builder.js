'use strict';
/**
 * Builder
 */

const Connection = require('mqtt-connection')
const Protocol = require('./protocol')
const Broker = require('./broker')

exports.connection = function (socket) {
  return new Connection(socket)
}

exports.broker = function() {
  return new Broker()
}

exports.protocol = function(store, socket) {
  return new Protocol(store, socket)
}