import { Client } from 'paho-mqtt';
import type { Message, MQTTError } from 'paho-mqtt';

import { brokerURL } from '@/constants';

const ports = 8884;
const hosts = `wss://${brokerURL}:${ports}/mqtt`;
const clientId = 'mobileApp';
const credentials = '12345678';

export const mqttClient = new Client(hosts, clientId);

type ConnectToBrokerParams = {
  topic: string;
  onMessageArrived: (message: Message) => void;
  onConnectionLost: (error: MQTTError) => void;
  onConnectionSuccess?: () => void;
  onConnectionFailure?: (error: MQTTError) => void;
};

export const connectToBroker = ({
  topic,
  onMessageArrived,
  onConnectionLost,
  onConnectionSuccess,
  onConnectionFailure,
}: ConnectToBrokerParams) => {
  // Set up MQTT client handlers
  mqttClient.onConnectionLost = onConnectionLost;

  if (onMessageArrived) mqttClient.onMessageArrived = onMessageArrived;

  // Connect to MQTT broker
  mqttClient.connect({
    useSSL: true,
    userName: credentials,
    password: credentials,
    onSuccess: () => {
      console.log('Connected to MQTT broker');
      mqttClient.subscribe(topic, {
        qos: 0,
        onSuccess: () => {
          console.log(`Subscribed to topic: ${topic}`);
          onConnectionSuccess?.();
        },
        onFailure: (error) => {
          console.error('Failed to subscribe:', error.errorMessage);
          onConnectionFailure?.(error);
        },
      });
    },
    onFailure: (error) => {
      console.error('Connection failed:', error.errorMessage);
      onConnectionFailure?.(error);
    },
  });
};
