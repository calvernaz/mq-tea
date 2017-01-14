/*jslint node: true */
/*jshint asi: true */
'use strict';

const debug = require('debug')('mq-tea')
const _ = require('underscore')
const Sequences = require('./sequences')

/**
 */
module.exports = Decoder
function Decoder(config) {}

/**
 * Decode message
 *
 * @param {String} identifier
 * @return an {Object}
 * @api public
 */
Decoder.prototype.lookup = function (cmd) {
  return _.findWhere(_messages, { name: cmd })
}

const _messages = [
  { name: 'connect', sequence: Sequences.Connect }
]