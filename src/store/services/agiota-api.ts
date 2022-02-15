import axios from 'axios';

const api = axios.create({
  baseURL: process.env.AGIOTA_API,
});

export default api;
