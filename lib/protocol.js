/* jslint node: true */
/* jshint asi: true */
'use strict'

const debug = require('debug')('mq-tea')
const util = require('util')
const ProtocolHelper = require('./protocol-helper')
const session = require('./sessions').session

module.exports = Protocol
util.inherits(Protocol, ProtocolHelper)

function Protocol(connection) {
  this._subscriptions = {}
  this._conn = connection
  this._conn.on('connect', this._onConnect.bind(this))
  this._conn.on('publish', this._onPublish.bind(this))
  this._conn.on('puback', this._onPublishAck.bind(this))
  this._conn.on('pubrec', this._onPublishReceived.bind(this))
  this._conn.on('pubrel', this._onPublishRelease.bind(this))
  this._conn.on('pubcomp', this._onPublishComplete.bind(this))
  this._conn.on('subscribe', this._onSubscribe.bind(this))
  this._conn.on('unsubscribe', this._onUnsubscribe.bind(this))
  this._conn.on('pingreq', this._onPing.bind(this))
  this._conn.on('disconnect', this._onDisconnect.bind(this))
  ProtocolHelper.call(this)
}


Protocol.prototype._onConnect = function(packet) {
  debug(packet)
  this._session = session(packet)
  this._conn.connack({ returnCode: 0 });
  this.emit('clientConnected', this._session)
}

/**
 * Handles the Publish packet.
 *
 * @param packet
 * @private
 */
Protocol.prototype._onPublish = function(packet) {
  debug(packet)

  let subscriber = this._subscriptions[this._session.sessionId]
  if (subscriber.topic === packet.topic)
    this._conn.publish({
      topic: packet.topic,
      payload: packet.payload,
      qos: packet.qos,
      messageId: packet.messageId,
      retain: false
    })
}

Protocol.prototype._onPublishAck = function(packet) {}
Protocol.prototype._onPublishReceived = function(packet) {}
Protocol.prototype._onPublishRelease = function(packet) {}
Protocol.prototype._onPublishComplete = function(packet) {}

/**
 * Handle the Subscribe packet.
 *
 * @param packet
 * @private
 */
Protocol.prototype._onSubscribe = function(packet) {
  debug(packet)

  let that = this
  packet.subscriptions.forEach(function(sub, index) {
    that._subscriptions[that._session.sessionId] = {
      topic: sub.topic,
      qos: sub.qos
    }

    that._conn.suback({
      messageId: packet.messageId,
      granted: [0]
    })
  })
}

/**
 * Handles Unsubscribe packet
 *
 * @param packet
 * @private
 */
Protocol.prototype._onUnsubscribe = function(packet) {
  debug(packet)
  this._conn.unsuback({
    messageId: packet.messageId
  });
}

/**
 * Handles PingReq packet.
 * Responses back PingResp packet.
 *
 * @param packet
 * @private
 */
Protocol.prototype._onPing = function(packet) {
  debug(packet)
  this._conn.pingresp()
}

/**
 * Handles Disconnect packet.
 *
 * @param packet
 * @private
 */
Protocol.prototype._onDisconnect = function(packet) {
  debug(packet)
  this._conn.destroy()

  // MUST discard any Will Message associated with the current
  // connection without publishing it, as described in Section 3.1.2.5

  this.emit('clientDisconnect', this._session.sessionId)
}