import { queryOptions } from "@tanstack/react-query";

import { getSubmissionById } from "../services";

export const getSubmissionDetailQueryOptions = (submissionId: string | null) =>
  queryOptions({
    queryKey: ["submission-detail", submissionId],
    queryFn: () => getSubmissionById(submissionId!),
    enabled: !!submissionId,
  });
