'use strict';

const debug = require('debug')('mq-tea')
const uuid = require('uuid');

const MqttVersion = require('../constants').MqttVersion
const MqttConnectReturnCode = require('../constants').MqttConnectReturnCode


/**
 *
 * @param packet
 * @param connection
 */
exports.onConnect = function(packet, connection)
{
  if (packet.protocolVersion !== MqttVersion.MQIsdp
    && packet.protocolVersion !== MqttVersion.MQTT)
    return connAck(connection, MqttConnectReturnCode.ConnectionRefusedBadProtocol, false)

  let id = packet.clientId
  if (!id || !id.length) {
    if (!packet.clean) {
      connAck(connection, MqttConnectReturnCode.ConnectionRefusedIdentifier, false)
      connection.stream.end()
    }

    id = uuid.v4()
  }

  if (!login(connection, packet, id)) {
    connection.stream.end()
    return
  }

  storeWillMessage(packet, id)
  if (!sendAck(connection, packet, id)) {
    connection.stream.end()
    return
  }

  if (!createOrLoadClientSession(connection, packet, id)) {
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

function sendAck (connection, packet, id)
{
  debug(connAck)
  let sessionStore = false
  if (!packet.clean && sessionStore) {
    connAck(connection, MqttConnectReturnCode.ConnectionAccepted, true)
  } else {
    connAck(connection, MqttConnectReturnCode.ConnectionAccepted, false)
  }
  return true
}

function createOrLoadClientSession (connection, packet, id)
{

  // clientSession = m_sessionsStore.sessionForClient(clientId);
  //boolean isSessionAlreadyStored = clientSession != null;
  //if (!isSessionAlreadyStored) {
  //  clientSession = m_sessionsStore.createNewSession(clientId, msg.variableHeader().isCleanSession());
  //}
  if (packet.clean) {
    //clientSession.cleanSession();
  }
  return {}
}