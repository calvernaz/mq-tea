/*jslint node: true */
/*jshint asi: true */
'use strict';

const debug = require('debug')('mq-tea')
const util = require('util')
const Message = require('./Message')

util.inherits(Connect, Message)

/**
 * @class Connect
 * @constructor
 **/
function Connect() {
  Message.call(this)
}

Connect.prototype['connect'] = function (message) {
  debug('connect message')
}

module.exports = Connect