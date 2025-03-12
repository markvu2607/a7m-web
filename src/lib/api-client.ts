import { redirect } from "@tanstack/react-router";
import axios, { type AxiosInstance } from "axios";

import { refreshToken } from "@/features/auth/services";
import { useAuth } from "@/features/auth/store";
import { RefreshTokenResponse } from "@/features/auth/types";
import { ApiResponseSuccess } from "@/types";

const api: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (reason?: unknown) => void;
}[] = [];

const processQueue = (error: unknown = null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token as string);
    }
  });
  failedQueue = [];
};

api.interceptors.request.use(
  (config) => {
    const accessToken = useAuth.getState().token?.accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(api(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await refreshToken();
        const newToken = (response as ApiResponseSuccess<RefreshTokenResponse>)
          .data!;
        useAuth.getState().setToken(newToken);

        processQueue(null, newToken.accessToken);

        originalRequest.headers.Authorization = `Bearer ${newToken.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        useAuth.getState().clear();
        redirect({ to: "/login" });
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error.response.data);
  }
);

export default api;
