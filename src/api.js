import axios from 'axios';

// Configure Axios instance for the frontend
const api = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;
