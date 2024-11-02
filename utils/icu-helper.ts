import { formatDateToId } from '@/utils/date-formatter';
import type { ICUData } from '@/utils/mock-data';

export const LIMIT_TO_DISPLAY = 20;

export type VitalSign = {
  date: Date;
  value: number;
};

export type ProcessedICUData = {
  ecg: VitalSign[];
  sp02: VitalSign[];
  rr: VitalSign[];
  bt: VitalSign[];
  hr: VitalSign[];
  currentValues: {
    ecg: string;
    sp02: string;
    hr: string;
    rr: string;
    bt: string;
    nibp: string;
    updatedTime: string;
  } | null;
};

export function processICUData(data: ICUData): ProcessedICUData {
  // Create VitalSign array for each metric
  const currentDate = new Date(data.updatedTime);

  const vitalSignData = {
    ecg: [{ date: currentDate, value: data.ecg }],
    sp02: [{ date: currentDate, value: data.sp02 }],
    rr: [{ date: currentDate, value: data.rr }],
    bt: [{ date: currentDate, value: data.bt }],
    hr: [{ date: currentDate, value: data.hr }],
  };

  // Format current values
  const currentValues = {
    ecg: data.ecg.toFixed(3),
    sp02: `${data.sp02}%`,
    hr: `${data.hr} bpm`,
    rr: `${data.rr} bpm`,
    bt: `${data.bt.toFixed(1)}°C`,
    nibp: `${data.nipb}`,
    updatedTime: formatDateToId(data.updatedTime, 'dd MMMM yyyy HH:mm:ss'),
  };

  return {
    ...vitalSignData,
    currentValues,
  };
}

export function mergeICUData(
  newData: ProcessedICUData,
  prevData: ProcessedICUData,
): ProcessedICUData {
  return {
    ecg: [...prevData.ecg, ...newData.ecg].slice(-LIMIT_TO_DISPLAY),
    sp02: [...prevData.sp02, ...newData.sp02].slice(-LIMIT_TO_DISPLAY),
    rr: [...prevData.rr, ...newData.rr].slice(-LIMIT_TO_DISPLAY),
    bt: [...prevData.bt, ...newData.bt].slice(-LIMIT_TO_DISPLAY),
    hr: [...prevData.hr, ...newData.hr].slice(-LIMIT_TO_DISPLAY),
    currentValues: newData.currentValues,
  };
}
