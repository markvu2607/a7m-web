import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/problems/")({
  loader: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      problems: [
        {
          slug: "word-subsets",
          title: "Word Subsets",
        },
      ],
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
