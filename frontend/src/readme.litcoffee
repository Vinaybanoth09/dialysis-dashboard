# Dialysis Session Intake & Anomaly Dashboard

A full-stack system for dialysis nurses to register patients and track treatment sessions with automated anomaly detection.

## 🚀 Setup Instructions
1. **Database:** Create a MongoDB Atlas cluster and get your connection string.
2. **Backend:**
   - Navigate to `/backend`
   - Create a `.env` file with `MONGO_URI=your_link` and `PORT=5000`
   - Run `npm install` then `npm run dev`
3. **Frontend:**
   - Navigate to `/frontend`
   - Run `npm install` then `npm run dev`
   - Open `http://localhost:5173`

## 🧠 Clinical Assumptions & Trade-offs
To ensure patient safety, the following "Danger Thresholds" were encoded in `config.ts`:
- **Excessive Weight Gain:** Defined as >5% of the patient's dry weight. This is a common clinical marker for fluid overload between sessions.
- **High Blood Pressure:** Systolic BP > 140 mmHg. 
- **Session Duration:** Expected window is 3–5 hours. Sessions outside this range are flagged for review.

## 🛠 Architecture Overview
- **Backend:** Node.js/Express with TypeScript. Used a Controller-Service-Model pattern to separate database logic from API routes.
- **Frontend:** React with Vite. Used Axios for API communication and Lucide-React for visual status indicators.
- **Data:** MongoDB (Mongoose) using a referenced relationship between Sessions and Patients to ensure data integrity.

## 🤖 AI Usage Disclosure
- **Tool:** Gemini 3 Flash.
- **Usage:** Assisted with initial TypeScript configuration (ESM vs CommonJS) and UI layout brainstorming.
- **Manual Review:** I manually adjusted the anomaly detection logic to ensure thresholds were calculated against the 'Dry Weight' stored in the Patient record, not just the previous session weight.