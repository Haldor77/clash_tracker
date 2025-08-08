import axios from 'axios';

// Base Axios instance pointing to a proxy server.
// TODO: The proxy must hold the Supercell API key and whitelist its own IP.
export const api = axios.create({
  baseURL: 'https://YOUR_PROXY/',
  timeout: 10000,
});

api.interceptors.response.use(
  response => response,
  error => {
    const message = error?.response?.data?.message || error.message;
    console.error('API error:', message);
    return Promise.reject(error);
  }
);
