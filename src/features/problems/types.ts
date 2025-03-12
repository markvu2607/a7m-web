export type Problem = {
  id: string;
  slug: string;
  index: number;
  title: string;
  description: string;
  difficulty: ProblemDifficulty;
};

export type ProblemDifficulty = "EASY" | "MEDIUM" | "HARD";
