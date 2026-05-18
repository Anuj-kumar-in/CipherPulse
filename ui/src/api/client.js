import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  analyzeMessage: (data) => client.post('/analyze', data),
  getMessages: (params) => client.get('/messages', { params }),
  getAlerts: (params) => client.get('/alerts', { params }),
  submitFeedback: (data) => client.post('/feedback', data),
  getStats: () => client.get('/stats'),
  executeSql: (query) => client.post('/sql/analyze', { query }),
};

export default client;
