import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Make sure this is "getSessions"
export const getSessions = () => axios.get(`${API_URL}/sessions/today`);
export const registerPatient = (data: any) => axios.post(`${API_URL}/patients`, data);
export const addSession = (data: any) => axios.post(`${API_URL}/sessions`, data);