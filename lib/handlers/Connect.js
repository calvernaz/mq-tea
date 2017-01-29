'use strict';

const debug = require('debug')('mq-tea')

module.exports = Connect

function restoreSubscription(store, connection)
{
  handleAuthorizeSubscribe(connection)
  store.insert(session)
}

function removeSubscription(store, connection)
{
  store.remove(connection.clientId)
}

function handleAuthorizeSubscribe(connection)
{
   throw Error("Handle authorize subscribe not implement yet")
}

/**
 *
 * @param connection
 * @param session
 * @param store
 */
function Connect(connection, session, store, cb) {
  if (session.restoreSession()) restoreSubscription(store, connection)
  else removeSubscription(store, connection)


  connection.connack({
    returnCode: 0,
    sessionPresent: false
  })

  cb(false)
}

