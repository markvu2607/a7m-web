import { useQuery } from "@tanstack/react-query";

import { getProblems } from "../services";

export const useProblems = () => {
  return useQuery({
    queryKey: ["problems"],
    queryFn: getProblems,
  });
};
