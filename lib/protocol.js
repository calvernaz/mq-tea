/* jslint node: true */
/* jshint asi: true */
'use strict'

const debug = require('debug')('mq-tea')
const util = require('util')
const events = require('events')
const async = require('async')

const session = require('./session-storage').session

const builder = require('./builder')
const handler = require('./handlers')


module.exports = Protocol
util.inherits(Protocol, events.EventEmitter)

function Protocol(sessionStore, connection)
{
  this.sessionStore = sessionStore
  this.connection = connection

  this.connection.once('connect', this._onConnect.bind(this))
  this.connection.on('publish', this._onPublish.bind(this))
  this.connection.on('puback', this._onPublishAck.bind(this))
  this.connection.on('pubrec', this._onPublishReceived.bind(this))
  this.connection.on('pubrel', this._onPublishRelease.bind(this))
  this.connection.on('pubcomp', this._onPublishComplete.bind(this))
  this.connection.on('subscribe', this._onSubscribe.bind(this))
  this.connection.on('unsubscribe', this._onUnsubscribe.bind(this))
  this.connection.on('pingreq', this._onPing.bind(this))
  this.connection.on('disconnect', this._onDisconnect.bind(this))
  events.EventEmitter.call(this)
}

/**
 * Handles the Connect packet.
 * A client can only send the CONNECT Packet once over a Network Connection.
 *
 * @param packet
 * @private
 */
Protocol.prototype._onConnect = function(packet)
{
  debug(packet)
  handler['Connect'].onConnect(this.sessionStore, packet, this.connection)
}

/**
 * Handles the Publish packet.
 *
 * @param packet
 * @private
 */
Protocol.prototype._onPublish = function(packet)
{
  debug(packet)

  let subscriber = this._subscriptions[this._session.sessionId]
  if (subscriber.topic === packet.topic)
    this.connection.publish({
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
Protocol.prototype._onSubscribe = function(packet)
{
  debug(packet)

  //this._sessionStore.sessionForClient()
  handler['Subscribe'].onSubscribe(packet, this.connection)

  this.connection.suback({
    messageId: packet.messageId,
    granted: [0]
  })
}

/**
 * Handles Unsubscribe packet
 *
 * @param packet
 * @private
 */
Protocol.prototype._onUnsubscribe = function(packet)
{
  debug(packet)
  this.connection.unsuback({
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
Protocol.prototype._onPing = function(packet)
{
  debug(packet)
  handler.Ping(this.connection, this._session)
}

/**
 * Handles Disconnect packet.
 *
 * @param packet
 * @private
 */
Protocol.prototype._onDisconnect = function(packet)
{
  debug(packet)
  handler.Disconnect(this.connection, this._session, this._sessionStore)

  // MUST discard any Will Message associated with the current
  // connection without publishing it, as described in Section 3.1.2.5

  this.emit('clientDisconnect', this._session.sessionId)
}