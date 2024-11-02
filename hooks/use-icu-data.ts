import type { Message, MQTTError } from 'paho-mqtt';
import { useEffect, useRef, useState } from 'react';

import { connectToBroker, mqttClient } from '@/core/mqtt';
import { mergeICUData, processICUData } from '@/utils/icu-helper';
import type { ProcessedICUData } from '@/utils/icu-helper';
import type { ICUData } from '@/utils/mock-data';

const initialData: ProcessedICUData = {
  bt: [],
  ecg: [],
  hr: [],
  rr: [],
  sp02: [],
  currentValues: null,
};

type UseICUDataProps = {
  patientId?: string;
  onMessageArrived?: (data: ICUData) => void;
  onConnectionLost?: (error: MQTTError) => void;
};

export const useICUData = ({
  patientId,
  onMessageArrived,
  onConnectionLost,
}: UseICUDataProps) => {
  const [data, setData] = useState<ProcessedICUData>(initialData);
  const [isConnected, setIsConnected] = useState(false);
  const currentTopic = useRef<string>();

  useEffect(() => {
    if (!patientId) return;

    currentTopic.current = `IcuTopic/${patientId}`;

    const handleConnectionLost = (error: MQTTError) => {
      if (error.errorCode !== 0) {
        console.log('onConnectionLost:', error.errorMessage);
        setIsConnected(false);
        onConnectionLost?.(error);
      }
    };

    const handleMessageArrived = (message: Message) => {
      if (message.destinationName !== currentTopic.current) return;

      try {
        const rawData = JSON.parse(message.payloadString) as ICUData;
        onMessageArrived?.(rawData);

        setData((prevData) => {
          const latestData = processICUData(rawData);
          return mergeICUData(latestData, prevData);
        });
      } catch (error) {
        console.error('Error processing message:', error);
      }
    };

    if (!mqttClient.isConnected()) {
      connectToBroker({
        topic: currentTopic.current,
        onMessageArrived: handleMessageArrived,
        onConnectionLost: handleConnectionLost,
        onConnectionSuccess: () => setIsConnected(true),
        onConnectionFailure: () => setIsConnected(false),
      });
    }

    return () => {
      if (mqttClient.isConnected()) {
        currentTopic.current && mqttClient.unsubscribe(currentTopic.current);
        mqttClient.disconnect();
      }
      setData(initialData);
      setIsConnected(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientId]);

  return {
    data,
    isConnected,
  };
};
