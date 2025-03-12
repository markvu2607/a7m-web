import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { RegisterResponse } from "./types";

type AuthStore = {
  token: (RegisterResponse & { accessTokenExpiresAt: number }) | null;
};

type AuthActions = {
  setToken: (token: RegisterResponse) => void;
  clear: () => void;
};

export const useAuth = create<AuthStore & AuthActions>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) =>
        set({
          token: {
            ...token,
            accessTokenExpiresAt: new Date().getTime() + token.expiresIn * 1000,
          },
        }),
      clear: () => set({ token: null }),
    }),
    { name: "auth", storage: createJSONStorage(() => localStorage) }
  )
);
