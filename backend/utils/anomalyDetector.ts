import { CLINICAL_THRESHOLDS } from '../config.js';

export const detectAnomalies = (sessionData: any, dryWeight: number) => {
  const reasons: string[] = [];

  // 1. Check Weight Gain (Formula: (Pre-weight - Dry Weight) / Dry Weight)
  const weightGain = sessionData.preWeight - dryWeight;
  const weightGainPercent = (weightGain / dryWeight) * 100;

  if (weightGainPercent > CLINICAL_THRESHOLDS.MAX_WEIGHT_GAIN_PERCENT) {
    reasons.push(`Excessive weight gain: ${weightGainPercent.toFixed(1)}%`);
  }

  // 2. Check Blood Pressure
  if (sessionData.systolicBP > CLINICAL_THRESHOLDS.MAX_SYSTOLIC_BP) {
    reasons.push(`High Systolic BP: ${sessionData.systolicBP} mmHg`);
  }

  // 3. Check Duration (if endTime exists)
  if (sessionData.startTime && sessionData.endTime) {
    const start = new Date(sessionData.startTime).getTime();
    const end = new Date(sessionData.endTime).getTime();
    const durationHours = (end - start) / (1000 * 60 * 60);

    if (durationHours < CLINICAL_THRESHOLDS.MIN_SESSION_HOURS) {
      reasons.push(`Short session duration: ${durationHours.toFixed(1)} hours`);
    }
  }

  return {
    hasAnomaly: reasons.length > 0,
    reasons
  };
};