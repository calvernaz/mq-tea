'use strict';

const debug = require('debug')('mq-tea')

module.exports = Disconnect

function Disconnect(connection, session, store)
{
  connection.destroy()
}