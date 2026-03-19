# 🏥 Dialysis Session Intake Dashboard
**Developed by Vinny**

## Project Overview
I built this full-stack application to help dialysis nurses manage patient intake and automatically flag clinical risks. My goal was to create a system that is easy to use during a busy shift while ensuring patient safety through real-time anomaly detection.

## 🛠 My Tech Stack
- **Frontend:** React + TypeScript (Vite) for a fast, responsive UI.
- **Backend:** Node.js & Express (TypeScript) to handle clinical logic.
- **Database:** MongoDB Atlas for flexible patient and session storage.
- **Icons:** Lucide-React for clear visual health alerts.

## 🧠 Clinical Logic & My Assumptions
Since the assignment had some "intentional ambiguity," I made the following clinical decisions to protect patients:
1. **Weight Gain:** I flag any patient who has gained more than **5% of their dry weight** since their last session. This helps nurses spot fluid overload immediately.
2. **Blood Pressure:** I set the high-risk threshold at **140 mmHg (Systolic)** based on standard hypertension guidelines for dialysis patients.
3. **Session Time:** I assumed a standard treatment lasts **3-5 hours**. If a session is shorter than 3 hours, the system flags it so the nurse can document the reason for early termination.

## 🚀 How to Run My Project
1. **Clone the repo** and open it in VS Code.
2. **Backend Setup:**
   - Go to `/backend`, run `npm install`.
   - Add your `MONGO_URI` to a `.env` file.
   - Run `npm run dev` to start the server on Port 5000.
3. **Frontend Setup:**
   - Go to `/frontend`, run `npm install`.
   - Run `npm run dev` and open the link in your browser.

## 💡 What I Learned & AI Use
I used AI (Gemini) as a pair-programmer to help me set up the TypeScript configuration and brainstorm the UI layout. 
- **What I changed:** I manually refined the anomaly detection logic to make sure it was comparing the current weight against the **Patient's Dry Weight** stored in the database, ensuring the calculations were medically accurate.
- **Next Steps:** If I had more time, I would add a "Nurse Login" and a way to export today's anomalies as a PDF report.