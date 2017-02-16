'use strict';

const debug = require('debug')('mq-tea')
const uuid = require('uuid');
const builder = require('../builder')

const MqttVersion = require('../constants').MqttVersion
const MqttConnectReturnCode = require('../constants').MqttConnectReturnCode

/**
 *
 * @param packet
 * @param connection
 */
exports.onConnect = function(sessionStore, packet, connection)
{
  if (packet.protocolVersion !== MqttVersion.MQIsdp
    && packet.protocolVersion !== MqttVersion.MQTT)
    return connAck(connection, MqttConnectReturnCode.ConnectionRefusedBadProtocol, false)

  let id = packet.clientId
  if (!id || !id.length) {
    if (!packet.clean) {
      connAck(connection, MqttConnectReturnCode.ConnectionRefusedIdentifier, false)
      connection.stream.end()
      debug(`The MQTT client ID cannot be empty. Username ${packet.userName}`)
      return
    }

    id = uuid.v4()
  }

  if (!login(connection, packet, id)) {
    connection.stream.end()
    return
  }

  storeWillMessage(packet, id)
  if (!sendAck(sessionStore, connection, packet, id)) {
    connection.stream.end()
    return
  }

  if (!createOrLoadClientSession(sessionStore, packet, id)) {
    connection.stream.end()
    return
  }
}

/*
 * Helper Functions
 */
function connAck(connection, returnCode, sessionPresent)
{
  connection.connack({ returnCode: returnCode, sessionPresent: sessionPresent })
}

// TODO: implement authenticator
function login(connection, packet, id)
{
  if (packet.username) {
    if (packet.password) {
      return packet.username === packet.password.toString()
    }
  }
  return false;
}

function storeWillMessage (packet, id)
{
  if (packet.will) {
    // willStore[id] = packet.will
  }
}

function sendAck (sessionStore, connection, packet, clientId)
{
  debug(`Sending connect ACK. CId = ${clientId}`)

  let clientSession = sessionStore.lookup(clientId)
  if (!packet.clean && clientSession.length) {
    connAck(connection, MqttConnectReturnCode.ConnectionAccepted, true)
  } else {
    connAck(connection, MqttConnectReturnCode.ConnectionAccepted, false)
  }

  if (clientSession.length > 0) {
    debug(`Cleaning session. CId = ${clientId}`)
    clientSession.cleanSession(packet.clean)
  }
  return true
}

function createOrLoadClientSession (sessionStore, packet, clientId)
{

  let clientSession = sessionStore.lookup(clientId)
  if (clientSession.length < 1) {
    debug('No sessions to reuse. Creating new session')
    var session = builder.clientSession(clientId, null, null, packet.clean)
    debug(session.cleanSession)
    sessionStore.insert({ sessionId: clientId, session: session })
  }

  if (packet.clean) {
    clientSession = sessionStore.lookup(clientId)
  }
  return true
}