/* jslint node: true */
/* jshint asi: true */
'use strict'

const util = require('util')
const _ = require('underscore')
const EventEmitter = require('events').EventEmitter


util.inherits(Connection, EventEmitter)
function Connection(socket, options) {
    this._options = _.extend({}, options)
    EventEmitter.call(this)
}


module.exports = Connection
