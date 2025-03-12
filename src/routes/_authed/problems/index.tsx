import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";

import { getProblemsQueryOptions } from "@/features/problems/queries/get-problems";
import { ProblemCard } from "@/features/problems/components/problem-card";

export const Route = createFileRoute("/_authed/problems/")({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(getProblemsQueryOptions);
  },
  component: RouteComponent,
  pendingComponent: () => <div>Loading...</div>,
});

function RouteComponent() {
  const { data: problems } = useSuspenseQuery(getProblemsQueryOptions);
  return (
    <div className="mx-auto w-full max-w-screen-xl space-y-4">
      <h1 className="font-bold text-2xl">Problem list</h1>
      {problems.data?.map((problem) => (
        <ProblemCard key={problem.slug} problem={problem} />
      ))}
    </div>
  );
}
