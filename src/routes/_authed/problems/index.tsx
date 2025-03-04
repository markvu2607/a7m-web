import { createFileRoute, Link } from "@tanstack/react-router";

import { getProblems } from "@/features/problems/services";

export const Route = createFileRoute("/_authed/problems/")({
  loader: async () => {
    const response = await getProblems();
    if (response.status === "error") {
      throw new Error(response.message);
    }
    if (!response.data) {
      throw new Error("No data");
    }
    return {
      problems: response.data,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { problems } = Route.useLoaderData();
  return (
    <div>
      <h1>Problems</h1>
      {problems.map((problem) => (
        <Link
          to="/problems/$slug"
          params={{ slug: problem.slug }}
          key={problem.slug}
        >
          <h2>{problem.title}</h2>
        </Link>
      ))}
    </div>
  );
}
