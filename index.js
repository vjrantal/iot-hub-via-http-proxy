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

var client = Client.fromConnectionString(connectionString, Transport);

client.setOptions({
  mqtt: {
    webSocketAgent: agent
  }
}, function () {
  var message = new Message(JSON.stringify({
    timestamp: Date.now()
  }));
  send(client, message, function () {
    process.exit();
  });
});
