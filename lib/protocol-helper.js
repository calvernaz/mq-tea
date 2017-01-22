/* jslint node: true */
/* jshint asi: true */
'use strict'

const debug = require('debug')('mq-tea')
const util = require('util')
const EventEmitter = require('events').EventEmitter


module.exports = ProtocolHelper
util.inherits(ProtocolHelper, EventEmitter)

function ProtocolHelper() {
  EventEmitter.call(this)
}