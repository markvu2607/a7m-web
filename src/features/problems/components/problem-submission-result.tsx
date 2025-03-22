import { Input } from "@/components/ui/input";

type Props = {
  submissionResult: {
    status: string;
    language: string;
    code: string;
  };
};

export const ProblemSubmissionResult = ({ submissionResult }: Props) => {
  return (
    <div className="space-y-4">
      <p className="text-sm font-medium text-gray-500">Status</p>
      <Input value={submissionResult?.status} />
    </div>
  );
};
