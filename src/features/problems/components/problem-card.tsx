import { Link } from "@tanstack/react-router";

import { Problem } from "../types";

type ProblemCardProps = {
  problem: Problem;
};

export const ProblemCard = ({ problem }: ProblemCardProps) => {
  return (
    <div className="rounded-lg border p-4">
      <Link to="/problems/$slug" params={{ slug: problem.slug }}>
        <h2 className="text-lg font-bold">{problem.title}</h2>
      </Link>
      <p className="text-sm text-gray-500">{problem.description}</p>
    </div>
  );
};
