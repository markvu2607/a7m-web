export type Problem = {
  id: string;
  slug: string;
  index: number;
  title: string;
  description: string;
  difficulty: string;
};

export type ProblemDifficulty = "EASY" | "MEDIUM" | "HARD";
