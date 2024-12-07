import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Backend URL

const axiosInstance = axios.create({
  baseURL: API_URL, // Connects to your backend
});

export default axiosInstance;
