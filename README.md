Sample project to show how to connect to Azure IoT Hub via HTTP proxy using the [official node SDK](https://github.com/Azure/azure-iot-sdk-node). MQTT over WebSockets is used as the transport protocol.

# Required environment variables

```
export https_proxy="http://<proxy>:<port>"
export connection_string="HostName=<iothub_host_name>;DeviceId=<device_id>;SharedAccessKey=<device_key>"
```
