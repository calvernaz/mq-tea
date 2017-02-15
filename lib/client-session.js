'use strict'

const debug = require('debug')('mq-tea')

module.exports = ClientSession
function ClientSession(opts)
{
  this.clientId = opts.clientId
  this.cleanSession = opts.clientSession
  this.subscriptions = new Set()
}

ClientSession.prototype.subscribe = function(subscription)
{
  debug(
    `Adding new subscription. MqttClientId = ${subscription.clientId}, 
    topics = ${subscription.topicFilter}, 
    qos = ${subscription.requestedQos}.`)

  // validate topic filter

  let matchingCouple = { clientId: this.clientId, topicFilter: subscription.topicFilter }
  let existingSub = this.sessionsStore.getSubscription(matchingCouple);

  // update the selected subscriptions if not present or if has a greater qos
  if (!existingSub == null || existingSub.requestedQos() < subscription.requestedQos()) {
    if (existingSub != null) {
      debug(`The subscription already existed with a lower QoS value. It will be updated. 
      MqttClientId = ${subscription.clientId()}, topics = ${subscription.topicFilter()}, 
      existingQos = ${existingSub.requestedQos()}, newQos = ${subscription.requestedQos()}.`)
      this.subscriptions.remove(subscription);
    }
    this.subscriptions.add(subscription);
    this.sessionsStore.addNewSubscription(subscription);
  }
  return true;
}