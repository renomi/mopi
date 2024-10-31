import { Client } from 'paho-mqtt';
import type { ConnectionOptions } from 'paho-mqtt';

import { brokerURL, topicId } from '@/constants';

const ports = 8884;
const hosts = `wss://${brokerURL}:${ports}/mqtt`;
const clientId = 'mobileApp';
const credentials = '12345678';

export const connectionOptions: ConnectionOptions = {
  useSSL: true,
  userName: credentials,
  password: credentials,
  onSuccess() {
    console.log('Connected to MQTT broker');
    if (mqttClient.isConnected()) {
      console.log('MQTT client is connected');
    } else {
      console.log('MQTT client is not connected');
    }
    mqttClient.subscribe(topicId, {
      qos: 0,
      onSuccess: () => {
        console.log(`Subscribed to topic: ${topicId}`);
      },
      onFailure: (error) => {
        console.log('Failed to subscribe:', error.errorMessage);
      },
    });
  },
  onFailure(error) {
    console.log('Connection failed:', error.errorMessage);
  },
};

export const mqttClient = new Client(hosts, clientId);
