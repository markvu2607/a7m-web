import { queryOptions } from "@tanstack/react-query";

import { getSubmissionsByProblemSlug } from "../services";

export const getSubmissionsByProblemSlugQueryOptions = (problemSlug: string) =>
  queryOptions({
    queryKey: ["submissions", problemSlug],
    queryFn: () => getSubmissionsByProblemSlug(problemSlug),
  });
