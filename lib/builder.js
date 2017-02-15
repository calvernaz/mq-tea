'use strict';
/**
 * Builder
 */

const Connection = require('mqtt-connection')
const Protocol = require('./protocol')
const Broker = require('./broker')

const MqttSubscription = require('./mqtt/mqtt-subscription')
const ClientSession = require('./client-session')


exports.connection = function (socket)
{
  return new Connection(socket)
}

exports.broker = function()
{
  return new Broker()
}

exports.protocol = function(store, socket)
{
  return new Protocol(store, socket)
}

exports.clientSession = function(clientId, msgStore, sessionStore, cleanSession)
{
  return new ClientSession(clientId, msgStore, sessionStore, cleanSession)
}

/**
 * A class that represents a MQTT subscription.
 */
exports.mqttSubscription = function(qos, id, topic, active)
{
  let config = { requestedQos: qos, clientId: id, topicFilter: topic, active: active }
  return new MqttSubscription(config)
}