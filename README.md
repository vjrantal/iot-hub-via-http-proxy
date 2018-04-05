Sample project to show how to connect to Azure IoT Hub via HTTP proxy using the [official SDK](https://github.com/Azure/azure-iot-sdk-node).

Currently uses MQTT over WebSockets with a workaround until [this issue](https://github.com/Azure/azure-iot-sdk-node/issues/98) is fixed and released.

# Required environment variables

```
export https_proxy="http://<proxy>:<port>"
export connection_string="HostName=<iothub_host_name>;DeviceId=<device_id>;SharedAccessKey=<device_key>"
```
