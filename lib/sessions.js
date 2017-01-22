/* jslint node: true */
/* jshint asi: true */
'use strict'

const Loki = require('lokijs');

module.exports = SessionStore

function SessionStore() {
  this.store = new Loki('db', { autosave: true, autoload: true })
  this._sessions = this.store.addCollection('sessions', {
    indices: ['sessionId']
  })
}

SessionStore.prototype.insert = function (object) {
  this._sessions.insert(object)
}

SessionStore.prototype.remove = function (sessionId) {
  this._sessions.removeWhere({ sessionId: sessionId, clean: 1 })
}

SessionStore.prototype.lookup = function(sessionId) {
  return this._sessions.find({ sessionId: sessionId })
}


/**
 * Session
 */
module.exports.session = function (connectPacket) {
  return {
    sessionId: connectPacket.clientId,
    protocolId: connectPacket.protocolId,
    protocolVersion: connectPacket.protocolVersion,
    keepAlive: connectPacket.keepalive,
    clean: connectPacket.clean,
    retain: connectPacket.retain,
    qos: connectPacket.qos,
    dup: connectPacket.dup,
    topic: connectPacket.topic
  }
}
