import api from "@/lib/api-client";
import { ApiResponse } from "@/types";

import { Problem, Testcase } from "./types";

export const getProblems = (): Promise<ApiResponse<Problem[]>> =>
  api.get("/problems");

export const getProblemBySlug = (slug: string): Promise<ApiResponse<Problem>> =>
  api.get(`/problems/${slug}`);

export const runCode = ({
  problemSlug,
  code,
  testcases,
}: {
  problemSlug: string;
  code: string;
  testcases: Testcase[];
}) =>
  api.post("/coding/run-code", {
    problemSlug,
    code,
    language: "python",
    testcases,
  });

export const submitCode = ({
  problemSlug,
  code,
}: {
  problemSlug: string;
  code: string;
}) =>
  api.post("/coding/submit-code", {
    problemSlug,
    code,
    language: "python",
  });

export const getSubmissionById = (submissionId: string) =>
  api.get(`/submissions/${submissionId}`);

export const getSubmissionsByProblemSlug = (problemSlug: string) =>
  api.get(`/submissions/problem/${problemSlug}`);
