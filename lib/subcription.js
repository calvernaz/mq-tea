'use strict';

module.exports = Subscription
/**
 * Maintain the information about which Topic a certain ClientID is subscribed
 * and at which QoS
 */
function Subscription(opts)
{
  this.clientId = opts.clientId
  this.topicFilter = opts.topicFilter
  this.requestedQos = opts.requestedQos
  this.active = opts.active
}

Subscription.prototype.clientId = function ()
{
  return this.clientId
}

Subscription.prototype.topicFilter = function ()
{
  return this.topicFilter
}

Subscription.prototype.requestedQos = function ()
{
  return this.requestedQos
}

Subscription.prototype.isActive = function ()
{
  return this.active
}
