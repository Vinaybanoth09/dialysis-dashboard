import { Request, Response } from 'express';
import { Patient } from '../models/Patient.js';

export const registerPatient = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, patientId, dryWeight, age, gender } = req.body;

    if (!name || !patientId || !dryWeight) {
       res.status(400).json({ message: "Missing required fields" });
       return;
    }

    const newPatient = new Patient({ name, patientId, dryWeight, age, gender });
    await newPatient.save();

    res.status(201).json({ message: "Patient registered successfully!", patient: newPatient });
  } catch (error: any) {
    res.status(500).json({ message: "Error saving patient", error: error.message });
  }
};