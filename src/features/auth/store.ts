import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";

import { User } from "@/types";

import { RegisterResponse } from "./types";

type AuthStore = {
  token: (RegisterResponse & { accessTokenExpiresAt: number }) | null;
  user: User | null;
};

type AuthActions = {
  setToken: (token: RegisterResponse) => void;
  setUser: (user: User) => void;
  clear: () => void;
};

export const useAuth = create<AuthStore & AuthActions>()(
  devtools(
    persist(
      (set) => ({
        token: null,
        user: null,
        setToken: (token) =>
          set({
            token: {
              ...token,
              accessTokenExpiresAt:
                new Date().getTime() + token.expiresIn * 1000,
            },
          }),
        setUser: (user) => set({ user }),
        clear: () => set({ token: null, user: null }),
      }),
      { name: "auth", storage: createJSONStorage(() => localStorage) }
    )
  )
);
