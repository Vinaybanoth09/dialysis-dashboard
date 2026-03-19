import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { registerPatient } from './controllers/patientController.js';
import { createSession, getTodaysSessions } from './controllers/sessionController.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware (This lets us read JSON data sent from the frontend)
app.use(cors());
app.use(express.json());

// Basic Route to test if it's working
app.get('/', (req, res) => {
  res.send('Dialysis API is running! 🏥');
});
app.post('/api/patients', registerPatient);
// Connect to MongoDB (We will put your actual URL in a .env file next)
const MONGO_URI = process.env.MONGO_URI || '';

app.post('/api/sessions', createSession);
app.get('/api/sessions/today', getTodaysSessions);

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));