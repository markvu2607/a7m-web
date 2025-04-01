export type Problem = {
  id: string;
  slug: string;
  index: number;
  title: string;
  description: string;
  difficulty: ProblemDifficulty;
  defaultCode: string;
  testcases: Testcase[];
};

export type ProblemDifficulty = "EASY" | "MEDIUM" | "HARD";

export type Testcase = {
  input: { field: string; value: string }[];
};

export type Submission = {
  id: string;
  userId: string;
  code: string;
  language: string;
  status: string;
  testcase: string;
  output: string;
  expectedOutput: string;
  createdAt: string;
};
