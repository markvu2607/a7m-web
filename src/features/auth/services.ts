import api from "@/lib/api-client";
import { ApiResponse, User } from "@/types";

import {
  LoginRequest,
  LoginResponse,
  RefreshTokenResponse,
  RegisterRequest,
  RegisterResponse,
} from "./types";
import { useAuth } from "./store";

export const login = ({
  email,
  password,
}: LoginRequest): Promise<ApiResponse<LoginResponse>> =>
  api.post("/auth/login", {
    email,
    password,
  });

export const logout = () => api.post("/auth/logout");

export const register = ({
  email,
  password,
  username,
}: RegisterRequest): Promise<ApiResponse<RegisterResponse>> =>
  api.post("/auth/register", {
    email,
    password,
    username,
  });

export const getMe = (): Promise<ApiResponse<User>> => api.get("/users/me");

export const refreshToken = async (): Promise<
  ApiResponse<RefreshTokenResponse>
> =>
  fetch(`${import.meta.env.VITE_API_URL}/auth/refresh-token`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${useAuth.getState().token?.refreshToken}`,
    },
  }).then((res) => res.json());
