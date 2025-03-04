import api from "@/lib/api-client";
import { ApiResponse } from "@/types";
import { Problem } from "./types";

export const getProblems = async (): Promise<ApiResponse<Problem[]>> => {
  return await api.get("/problems");
};

export const getProblemBySlug = async (
  slug: string
): Promise<ApiResponse<Problem>> => {
  return await api.get(`/problems/${slug}`);
};
