import type { MQTTError } from 'paho-mqtt';
import { useEffect, useState } from 'react';

import { connectionOptions, mqttClient } from '@/core/mqtt';
import { mergeICUData, processICUData } from '@/utils/icu-helper';
import type { ProcessedICUData } from '@/utils/icu-helper';
import type { ICUData } from '@/utils/mock-data';

const initialData: ProcessedICUData = {
  bt: [],
  ecg: [],
  hr: [],
  nibp: [],
  rr: [],
  sp02: [],
  currentValues: null,
};

type UseICUDataProps = {
  onMessageArrived?: (data: ICUData) => void;
  onConnectionLost?: (error: MQTTError) => void;
};

export const useICUData = ({
  onConnectionLost,
  onMessageArrived,
}: UseICUDataProps) => {
  const [data, setData] = useState<ProcessedICUData>(initialData);

  useEffect(() => {
    const handleConnectionLost = (error: MQTTError) => {
      if (error.errorCode !== 0) {
        console.log('onConnectionLost:', error.errorMessage);
        onConnectionLost?.(error);
      }
    };

    const handleMessageArrived = (message: { payloadString: string }) => {
      const rawData = JSON.parse(message.payloadString) as ICUData;
      onMessageArrived?.(rawData);

      setData((prevData) => {
        const latestData = processICUData(rawData);

        return mergeICUData(latestData, prevData);
      });
    };

    // Set up MQTT client handlers
    mqttClient.onConnectionLost = handleConnectionLost;
    mqttClient.onMessageArrived = handleMessageArrived;

    // Connect to MQTT broker
    mqttClient.connect(connectionOptions);

    // Cleanup on unmount
    return () => {
      if (mqttClient.isConnected()) {
        mqttClient.disconnect();
      }
    };
  }, [onMessageArrived, onConnectionLost]);

  return {
    data,
    isConnected: mqttClient.isConnected(),
  };
};
