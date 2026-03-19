import mongoose from 'mongoose';

const SessionSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  
  // Weights (The assignment asks for pre/post weight)
  preWeight: { type: Number, required: true },
  postWeight: { type: Number, required: true },
  
  // Vitals
  systolicBP: { type: Number, required: true }, // Top number of Blood Pressure
  diastolicBP: { type: Number, required: true },
  
  // Anomaly Flags (We calculate these before saving)
  anomalies: {
    hasAnomaly: { type: Boolean, default: false },
    reasons: [String] // e.g., ["High Blood Pressure", "Excessive Weight Gain"]
  },
  
  nurseNotes: { type: String }
}, { timestamps: true });

export const Session = mongoose.model('Session', SessionSchema);