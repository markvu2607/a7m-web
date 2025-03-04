import axios, { type AxiosInstance } from "axios";

import pbClient from "./pb-client";

const api: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

api.interceptors.request.use((config) => {
  const accessToken = pbClient.authStore.token;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Redirect to login page
          break;
        case 403:
          // Redirect to forbidden page
          break;
        case 404:
          // Redirect to not found page
          break;
        case 500:
          // Redirect to internal server error page
          break;
        default:
          break;
      }
    }
    return Promise.reject(error);
  }
);

export default api;
