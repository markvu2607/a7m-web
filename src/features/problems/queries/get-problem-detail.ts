import { queryOptions } from "@tanstack/react-query";

import { getProblemBySlug } from "../services";

export const getProblemDetailQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: ["problem-detail", slug],
    queryFn: () => getProblemBySlug(slug),
    select: (response) => {
      if (!response.success) {
        throw new Error(response.message as string);
      }
      return response.data;
    },
  });
