'use strict';

module.exports = MqttSubscription
function MqttSubscription(config) {
  this.requestedQos = config.requestedQos
  this.clientId = config.clientId
  this.topicFilter = config.topicFilter
  this.active = config.active
}