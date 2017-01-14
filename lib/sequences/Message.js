/*jslint node: true */
/*jshint asi: true */
'use strict';

const util = require('util')
const EventEmitter = require('events').EventEmitter


/**
 @module sequences
 **/
module.exports = Message
util.inherits(Message, EventEmitter)


/**
 @class Message
 @constructor
 @extends EventEmitter
 **/
function Message(callback) {
  EventEmitter.call(this)
}
