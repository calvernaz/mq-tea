/* jslint node: true */
/* jshint asi: true */
'use strict'

const debug = require('debug')('mq-tea')

module.exports = Session

function Session(connectPacket)
{
  this._session = this.createFrom(connectPacket)
}

Session.prototype.restoreSession = function ()
{
  return !this._session.cleanSession
}

Session.prototype.createFrom = function (connectPacket)
{
  return {
    sessionId: connectPacket.clientId,
    protocolId: connectPacket.protocolId,
    protocolVersion: connectPacket.protocolVersion,
    keepAlive: connectPacket.keepalive,
    cleanSession: connectPacket.clean,
    retain: connectPacket.retain,
    qos: connectPacket.qos,
    dup: connectPacket.dup,
    topic: connectPacket.topic,
    will: connectPacket.will
  }
}