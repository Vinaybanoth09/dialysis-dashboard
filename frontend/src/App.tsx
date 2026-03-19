import { useEffect, useState } from 'react';
import { getSessions, registerPatient, addSession } from './api';
import { AlertCircle, CheckCircle, UserPlus, Activity } from 'lucide-react';

function App() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [patientData, setPatientData] = useState({ name: '', patientId: '', dryWeight: '' });
  const [sessionData, setSessionData] = useState({ 
    patientId: '', preWeight: '', postWeight: '', systolicBP: '', diastolicBP: '' 
  });

  const loadData = () => {
    getSessions().then(res => setSessions(res.data)).catch(err => console.error(err));
  };

  useEffect(() => { loadData(); }, []);

  const handlePatientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await registerPatient({ ...patientData, dryWeight: Number(patientData.dryWeight) });
    alert("Patient Registered!");
    setPatientData({ name: '', patientId: '', dryWeight: '' });
  };

  const handleSessionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addSession({
        ...sessionData,
        preWeight: Number(sessionData.preWeight),
        postWeight: Number(sessionData.postWeight),
        systolicBP: Number(sessionData.systolicBP),
        diastolicBP: Number(sessionData.diastolicBP),
        startTime: new Date().toISOString()
      });
      alert("Session Recorded!");
      setSessionData({ patientId: '', preWeight: '', postWeight: '', systolicBP: '', diastolicBP: '' });
      loadData(); // This refreshes the list so the new session appears!
    } catch (err) {
      alert("Error: Make sure the Patient ID exists!");
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto', fontFamily: 'system-ui' }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>🏥 Dialysis Intake Portal</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
        {/* REGISTER PATIENT */}
        <section style={cardStyle}>
          <h2 style={{ fontSize: '1.1rem' }}><UserPlus size={18} /> New Patient</h2>
          <form onSubmit={handlePatientSubmit} style={formStyle}>
            <input placeholder="Name" value={patientData.name} onChange={e => setPatientData({...patientData, name: e.target.value})} required style={inputStyle} />
            <input placeholder="Patient ID" value={patientData.patientId} onChange={e => setPatientData({...patientData, patientId: e.target.value})} required style={inputStyle} />
            <input type="number" placeholder="Dry Weight" value={patientData.dryWeight} onChange={e => setPatientData({...patientData, dryWeight: e.target.value})} required style={inputStyle} />
            <button type="submit" style={buttonStyle}>Add Patient</button>
          </form>
        </section>

        {/* RECORD SESSION */}
        <section style={cardStyle}>
          <h2 style={{ fontSize: '1.1rem' }}><Activity size={18} /> Record Session</h2>
          <form onSubmit={handleSessionSubmit} style={formStyle}>
            <input placeholder="Patient ID (Match above)" value={sessionData.patientId} onChange={e => setSessionData({...sessionData, patientId: e.target.value})} required style={inputStyle} />
            <div style={{ display: 'flex', gap: '5px' }}>
              <input type="number" placeholder="Pre-Wt" value={sessionData.preWeight} onChange={e => setSessionData({...sessionData, preWeight: e.target.value})} required style={inputStyle} />
              <input type="number" placeholder="Post-Wt" value={sessionData.postWeight} onChange={e => setSessionData({...sessionData, postWeight: e.target.value})} required style={inputStyle} />
            </div>
            <div style={{ display: 'flex', gap: '5px' }}>
              <input type="number" placeholder="Sys BP" value={sessionData.systolicBP} onChange={e => setSessionData({...sessionData, systolicBP: e.target.value})} required style={inputStyle} />
              <input type="number" placeholder="Dia BP" value={sessionData.diastolicBP} onChange={e => setSessionData({...sessionData, diastolicBP: e.target.value})} required style={inputStyle} />
            </div>
            <button type="submit" style={{ ...buttonStyle, background: '#28a745' }}>Save Session</button>
          </form>
        </section>
      </div>

      {/* DASHBOARD LIST */}
      <h2 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>Today's Clinical Alerts</h2>
      <div style={{ display: 'grid', gap: '15px' }}>
        {sessions.map((session: any) => (
          <div key={session._id} style={{ 
            ...sessionItemStyle, 
            background: session.anomalies.hasAnomaly ? '#fff5f5' : '#ffffff',
            borderLeft: session.anomalies.hasAnomaly ? '5px solid #dc3545' : '5px solid #28a745'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>{session.patient?.name}</strong>
              <span style={{ color: '#666' }}>ID: {session.patient?.patientId}</span>
            </div>
            <p>Vitals: {session.systolicBP}/{session.diastolicBP} mmHg | Weight Change: {session.preWeight - session.postWeight}kg</p>
            
            {session.anomalies.hasAnomaly ? (
              <div style={{ color: '#dc3545', display: 'flex', gap: '8px' }}>
                <AlertCircle size={18} />
                <span><strong>Alert:</strong> {session.anomalies.reasons.join(', ')}</span>
              </div>
            ) : (
              <div style={{ color: '#28a745', display: 'flex', gap: '8px' }}>
                <CheckCircle size={18} /> <span>Stable</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// STYLES
const cardStyle = { background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #ddd', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' };
const formStyle = { display: 'flex', flexDirection: 'column' as const, gap: '10px' };
const inputStyle = { padding: '8px', borderRadius: '4px', border: '1px solid #ccc' };
const buttonStyle = { padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' };
const sessionItemStyle = { padding: '15px', borderRadius: '8px', border: '1px solid #eee', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' };

export default App;