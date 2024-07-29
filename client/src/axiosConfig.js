// src/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://gemini-mind-api.onrender.com',
  withCredentials: true
});

export default instance;
