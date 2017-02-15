/*jslint node: true */
/*jshint asi: true */
'use strict';

/**
 @module Constants
 **/
function define(name, value) {
  Object.defineProperty(exports, name, {
    value:      value,
    enumerable: true
  });
}

/**
 MQTT version specific constant values

 @property MqttVersion
 @type Object
 @final
 @static
 */
define('MqttVersion', {  MQIsdp: 3, MQTT: 4 })

/**
 MQTT connect return code

 @property MqttConnectReturnCode
 @type Object
 @final
 @static
 */
define('MqttConnectReturnCode', {
  ConnectionAccepted: 0x00,
  ConnectionRefusedBadProtocol: 0x01,
  ConnectionRefusedIdentifier: 0x02,
  ConnectionRefusedServerUnavailable: 0x03,
  ConnectionRefusedBadCredentials: 0x04,
  ConnectionRefusedNotAuthorized: 0x05
})


/**
 MQTT Qos

 @property MqttQos
 @type Object
 @final
 @static
 */
define('MqttQos', {
  AtMostOnce: 0x00,
  AtLeastOnce: 0x01,
  ExactlyOnce: 0x02,
  Failure: 0x80
})