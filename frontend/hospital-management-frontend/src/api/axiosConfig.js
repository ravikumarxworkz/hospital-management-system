import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/hospital/', // Your backend base URL
  headers: {
    'Content-Type': 'application/json', // The expected content type for requests
  },
  withCredentials: true,
});

export default axiosInstance;
