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
  nibp: VitalSign[];
  currentValues: {
    ecg: string;
    sp02: string;
    hr: string;
    rr: string;
    bt: string;
    nibp: string;
  } | null;
};

export function processICUData(data: ICUData): ProcessedICUData {
  const now = Date.now();

  // Create VitalSign array for each metric
  const vitalSignData = {
    ecg: [{ date: new Date(now), value: data.ecg }],
    sp02: [{ date: new Date(now), value: data.sp02 }],
    rr: [{ date: new Date(now), value: data.rr }],
    bt: [{ date: new Date(now), value: data.bt }],
    hr: [{ date: new Date(now), value: data.hr }],
    nibp: [{ date: new Date(now), value: data.systolic }],
  };

  // Format current values
  const currentValues = {
    ecg: data.ecg.toFixed(3),
    sp02: `${data.sp02}%`,
    hr: `${data.hr} bpm`,
    rr: `${data.rr} /min`,
    bt: `${data.bt.toFixed(1)}°C`,
    nibp: `${data.systolic}/${data.diastolic}`,
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
    ecg: [...newData.ecg, ...prevData.ecg].slice(0, LIMIT_TO_DISPLAY),
    sp02: [...newData.sp02, ...prevData.sp02].slice(0, LIMIT_TO_DISPLAY),
    rr: [...newData.rr, ...prevData.rr].slice(0, LIMIT_TO_DISPLAY),
    bt: [...newData.bt, ...prevData.bt].slice(0, LIMIT_TO_DISPLAY),
    hr: [...newData.hr, ...prevData.hr].slice(0, LIMIT_TO_DISPLAY),
    nibp: [...newData.nibp, ...prevData.nibp].slice(0, LIMIT_TO_DISPLAY),
    currentValues: newData.currentValues,
  };
}
