'use strict';

const debug = require('debug')('mq-tea')

module.exports = Ping

function Ping(connection, session) {
  connection.pingresp()
}
