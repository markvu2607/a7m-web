export type Problem = {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: string;
};

export type ProblemDifficulty = "EASY" | "MEDIUM" | "HARD";
