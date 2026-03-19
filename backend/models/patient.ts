import mongoose from 'mongoose';

const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  patientId: { type: String, required: true, unique: true },
  age: { type: Number },
  gender: { type: String },
  dryWeight: { type: Number, required: true }, // The patient's "ideal" weight
  unitId: { type: String, default: "Unit-A" } // To group patients by dialysis unit
}, { timestamps: true });

export const Patient = mongoose.model('Patient', PatientSchema);