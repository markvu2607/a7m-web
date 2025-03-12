import { queryOptions } from "@tanstack/react-query";

import { getProblems } from "../services";

export const getProblemsQueryOptions = queryOptions({
  queryKey: ["problems"],
  queryFn: getProblems,
  select: (response) => {
    if (!response.success) {
      throw new Error(response.message as string);
    }
    const { data, metadata } = response;
    return { data, metadata };
  },
});
