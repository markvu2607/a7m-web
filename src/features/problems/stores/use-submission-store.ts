import { create } from "zustand";

interface SubmissionStore {
  submissionId: string | null;
  actions: {
    setSubmissionId: (submissionId: string) => void;
  };
}

const useSubmissionStore = create<SubmissionStore>((set) => ({
  submissionId: null,
  actions: {
    setSubmissionId: (submissionId) => set({ submissionId }),
  },
}));

export const useSubmission = () => useSubmissionStore().submissionId;

export const useSubmissionActions = () => useSubmissionStore().actions;
