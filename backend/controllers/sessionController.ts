import { Request, Response } from 'express';
import { Session } from '../models/Session.js';
import { Patient } from '../models/Patient.js';
import { detectAnomalies } from '../utils/anomalyDetector.js';

export const createSession = async (req: Request, res: Response) => {
  try {
    const { patientId, preWeight, postWeight, systolicBP, diastolicBP, startTime, endTime } = req.body;

    // 1. Find the patient to get their dryWeight
    const patient = await Patient.findOne({ patientId });
    if (!patient) {
      res.status(404).json({ message: "Patient not found" });
      return;
    }

    // 2. Run Anomaly Detection
    const anomalyResult = detectAnomalies(req.body, patient.dryWeight);

    // 3. Create the Session
    const newSession = new Session({
      patient: patient._id,
      preWeight,
      postWeight,
      systolicBP,
      diastolicBP,
      startTime,
      endTime,
      anomalies: anomalyResult
    });

    await newSession.save();
    res.status(201).json(newSession);
  } catch (error: any) {
    res.status(500).json({ message: "Error saving session", error: error.message });
  }
};

// This one gets "Today's Schedule" as requested by the assignment
export const getTodaysSessions = async (req: Request, res: Response) => {
  try {
    const sessions = await Session.find().populate('patient');
    res.json(sessions);
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching sessions" });
  }
};