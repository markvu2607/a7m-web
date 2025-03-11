import { create } from "zustand";

type AuthStore = {
  token: {
    accessToken: string;
    refreshToken: string;
  } | null;
};

type AuthActions = {
  setToken: (token: { accessToken: string; refreshToken: string }) => void;
};

export const useAuth = create<AuthStore & AuthActions>()((set) => ({
  token: null,
  setToken: (token) => set({ token }),
}));
