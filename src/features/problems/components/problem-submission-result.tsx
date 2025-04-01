import { useQuery } from "@tanstack/react-query";

import { Input } from "@/components/ui/input";

import { getSubmissionDetailQueryOptions } from "../queries/get-submission-detail";
import { useSubmission } from "../stores/use-submission-store";

export const ProblemSubmissionResult = () => {
  const submissionId = useSubmission();
  const { data: submission } = useQuery(
    getSubmissionDetailQueryOptions(submissionId)
  );

  console.log(submission);

  return (
    <div className="space-y-4">
      <p className="text-sm font-medium text-gray-500">Status</p>
      <Input value={submission?.status} />
    </div>
  );
};
