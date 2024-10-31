// Mock data generator for ICU Monitoring
export const generateICUData = () => {
  // Generate random values for systolic and diastolic pressures within realistic ICU ranges
  const systolic = Math.floor(Math.random() * 21) + 100; // Systolic between 100-120
  const diastolic = Math.floor(Math.random() * 21) + 70; // Diastolic between 70-90

  return {
    ecg: parseFloat((Math.random() * 2 - 1).toFixed(6)), // ECG range between -1.5 and 1.5
    sp02: Math.floor(Math.random() * 6) + 95, // SpO2 between 95-100
    rr: Math.floor(Math.random() * 5) + 12, // Respiratory Rate between 12-16
    bt: parseFloat((Math.random() * 0.5 + 36.5).toFixed(5)), // Body Temperature between 36.5-37.0
    systolic, // Separate systolic value
    diastolic, // Separate diastolic value
    hr: Math.floor(Math.random() * 31) + 60, // Heart Rate between 60-90
    idMesinIcu: 'eee4e813-e74d-40a8-95da-47dad2e1cb65', // Static ID or you could generate UUID
  };
};

export type ICUData = ReturnType<typeof generateICUData>;
