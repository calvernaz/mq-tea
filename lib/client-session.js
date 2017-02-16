'use strict'
/* jshint asi: true */

const debug = require('debug')('mq-tea')

module.exports = ClientSession
function ClientSession(opts)
{
  this._clientId = opts.clientId
  this._cleanSession = opts.cleanSession
  this._sessionStore = opts.sessionStore
  this._messageStore = opts.messageStore
}
/*
ClientSession.prototype.subscribe = function(subscription)
{
  debug(
    `Adding new subscription. MqttClientId = ${subscription.clientId}, 
    topics = ${subscription.topicFilter}, 
    qos = ${subscription.requestedQos}.`)

  // validate topic filter

  let matchingCouple = { clientId: this.clientId, topicFilter: subscription.topicFilter }
  let existingSub = this.sessionStore.getSubscription(matchingCouple);

  // update the selected subscriptions if not present or if has a greater qos
  if (!existingSub == null || existingSub.requestedQos() < subscription.requestedQos()) {
    if (existingSub != null) {
      debug(`The subscription already existed with a lower QoS value. It will be updated. 
      MqttClientId = ${subscription.clientId()}, topics = ${subscription.topicFilter()}, 
      existingQos = ${existingSub.requestedQos()}, newQos = ${subscription.requestedQos()}.`)
      this.subscriptions.remove(subscription);
    }
    this.subscriptions.add(subscription);
    this.sessionStore.addNewSubscription(subscription);
  }
  return true;
}

ClientSession.prototype.cleanSession = function()
{
  debug(`Wiping existing subscriptions. MqttClientId = ${this.clientId}`)
//  this.sessionStore.wipeSubscriptions(this.clientId)
  debug(`Removing stored messages with QoS 1 and QoS 2. MqttClientId = ${this.clientId}`)
//  this.messageStore.dropMessagesInSession(this.clientId)
}
*/
ClientSession.prototype.cleanSession = function(cleanSession)
{
  //this.cleanSession = cleanSession
  //this.sessionStore.updateCleanStatus(this.clientId, cleanSession)
}