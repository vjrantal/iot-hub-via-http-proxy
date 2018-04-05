'use strict';

var HttpsProxyAgent = require('https-proxy-agent');
var Transport = require('azure-iot-device-mqtt').MqttWs;
var Client = require('azure-iot-device').Client;
var SharedAccessKeyAuthenticationProvider = require('azure-iot-device').SharedAccessKeyAuthenticationProvider;
var Message = require('azure-iot-device').Message;
var send = require('./send.js');

var proxy = process.env.https_proxy;
var connectionString = process.env.connection_string;

var agent = new HttpsProxyAgent(proxy);
var wsOptions = {
  agent: agent
};

// Workaround to demonstrate MQTT-WS connectivity over HTTP proxy
// Can be cleaned up once https://github.com/Azure/azure-iot-sdk-node/issues/98 is fixed and released
var transport = new Transport(SharedAccessKeyAuthenticationProvider.fromConnectionString(connectionString));
var mqtt = transport._mqtt;
mqtt.mqttprovider = require('mqtt');
var originalConnect = mqtt.mqttprovider.connect;
mqtt.mqttprovider.connect = function () {
  arguments[1].wsOptions = wsOptions;
  return originalConnect.apply(this, arguments);
};

var client = new Client(transport);

var message = new Message(JSON.stringify({
  timestamp: Date.now()
}));

send(client, message, function () {
  process.exit();
});
