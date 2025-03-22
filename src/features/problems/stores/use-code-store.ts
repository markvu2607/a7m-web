import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type CodeStore = {
  code: {
    [key: string]: string;
  };
  actions: (slug: string) => {
    setCode: (code: string) => void;
  };
};

export const useCodeStore = create<CodeStore>()(
  persist(
    (set) => ({
      code: {},
      actions: (slug: string) => ({
        setCode: (code: string) =>
          set((state) => {
            const newState = { ...state };
            newState.code[slug] = code;
            return newState;
          }),
      }),
    }),
    {
      name: "code-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useCodeActions = (slug: string) => {
  const actions = useCodeStore((state) => state.actions);
  return actions(slug);
};
export const useCode = (slug: string) =>
  useCodeStore((state) => state.code[slug]);
