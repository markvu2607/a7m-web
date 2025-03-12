import api from "@/lib/api-client";
import { ApiResponse } from "@/types";

import { Problem } from "./types";

export const getProblems = (): Promise<ApiResponse<Problem[]>> =>
  api.get("/problems");

export const getProblemBySlug = (slug: string): Promise<ApiResponse<Problem>> =>
  api.get(`/problems/${slug}`);
