import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeAction } from "@/features/problems/components/code-action";
import { CodeEditor } from "@/features/problems/components/code-editor";
import { ProblemDescription } from "@/features/problems/components/problem-description";
import { ProblemSolutions } from "@/features/problems/components/problem-solutions";
import { SubmissionTable } from "@/features/problems/components/submission-table";
import { ProblemSubmissionResult } from "@/features/problems/components/problem-submission-result";
import { getProblemDetailQueryOptions } from "@/features/problems/queries/get-problem-detail";
import { runCode, submitCode } from "@/features/problems/services";
import {
  useCode,
  useCodeActions,
} from "@/features/problems/stores/use-code-store";
import {
  useSubmission,
  useSubmissionActions,
} from "@/features/problems/stores/use-submission-store";
import { Testcase } from "@/features/problems/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authed/problems/$slug/")({
  loader: async ({ context: { queryClient }, params }) => {
    const response = await queryClient.ensureQueryData(
      getProblemDetailQueryOptions(params.slug)
    );
    if (!response.success) {
      throw notFound();
    }
  },
  component: RouteComponent,
  errorComponent: ({ error }) => <div>{JSON.stringify(error)}</div>,
  notFoundComponent: () => <div>Problem not found</div>,
});

type LeftTab = "description" | "submissions" | "submission-result";

type TestTab = "testcases" | "test-result";

function RouteComponent() {
  const { slug } = Route.useParams();
  const { data: problem } = useSuspenseQuery(
    getProblemDetailQueryOptions(slug as string)
  );

  const code = useCode(slug as string);
  const { setCode } = useCodeActions(slug as string);

  const [testcases, setTestcases] = useState<Testcase[]>(problem!.testcases!);
  const [testResult, setTestResult] = useState<
    {
      status: string;
      stdin: string;
      expectedOutput: string;
      output: string;
    }[]
  >([]);

  const submissionId = useSubmission();
  const { setSubmissionId } = useSubmissionActions();

  const isTestResultVisible = testResult.length > 0;

  const [activeTestTab, setActiveTestTab] = useState<TestTab>("testcases");

  const [activeLeftTab, setActiveLeftTab] = useState<LeftTab>("description");

  const runCodeMutation = useMutation({
    mutationFn: ({
      problemSlug,
      code,
      testcases,
    }: {
      problemSlug: string;
      code: string;
      testcases: Testcase[];
    }) => {
      return runCode({ problemSlug, code, testcases });
    },
    onSuccess: ({ data }) => {
      setTestResult(data);
      setActiveTestTab("test-result");
    },
  });
  const submitCodeMutation = useMutation({
    mutationFn: ({
      problemSlug,
      code,
    }: {
      problemSlug: string;
      code: string;
    }) => {
      return submitCode({ problemSlug, code });
    },
    onSuccess: ({ data }) => {
      setSubmissionId(data.submissionId);
      setActiveLeftTab("submission-result");
    },
  });

  if (!problem) {
    return null;
  }

  const handleCodeChange = (value: string) => {
    setCode(value);
  };

  const handleRun = () => {
    runCodeMutation.mutate({
      problemSlug: slug as string,
      code,
      testcases,
    });
  };

  const handleSubmit = () => {
    submitCodeMutation.mutate({
      problemSlug: slug as string,
      code,
    });
  };

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="rounded-lg border bg-gray-900"
    >
      <ResizablePanel defaultSize={50} minSize={25}>
        <Tabs
          defaultValue={activeLeftTab}
          onValueChange={(value) => setActiveLeftTab(value as LeftTab)}
          className="h-full flex flex-col"
        >
          <TabsList className="w-full rounded-none justify-start">
            <TabsTrigger key="description" value="description">
              Description
            </TabsTrigger>
            <TabsTrigger key="solutions" value="solutions">
              Solutions
            </TabsTrigger>
            <TabsTrigger key="submissions" value="submissions">
              Submissions
            </TabsTrigger>
            {submissionId && (
              <TabsTrigger key="submission-result" value="submission-result">
                Submission Result
              </TabsTrigger>
            )}
          </TabsList>
          <TabsContent
            key="description"
            value="description"
            className="px-4 py-6 relative flex-1 space-y-4"
          >
            <ProblemDescription problem={problem} />
          </TabsContent>
          <TabsContent
            key="solutions"
            value="solutions"
            className="px-4 py-6 relative flex-1 space-y-4"
          >
            <ProblemSolutions />
          </TabsContent>
          <TabsContent
            key="submissions"
            value="submissions"
            className="px-4 py-6 relative flex-1 space-y-4"
          >
            <SubmissionTable problemSlug={slug as string} />
          </TabsContent>
          {submissionId && (
            <TabsContent
              key="submission-result"
              value="submission-result"
              className="px-4 py-6 relative flex-1 space-y-4"
            >
              <ProblemSubmissionResult />
            </TabsContent>
          )}
        </Tabs>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={70}>
            <div className="flex flex-col gap-2 h-full pb-2">
              <CodeEditor
                value={code || problem!.defaultCode}
                onChange={handleCodeChange}
              />
              <CodeAction
                isRunning={runCodeMutation.isPending}
                onRun={handleRun}
                isSubmitting={submitCodeMutation.isPending}
                onSubmit={handleSubmit}
              />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={30}>
            <Tabs
              value={activeTestTab}
              onValueChange={(value) => setActiveTestTab(value as TestTab)}
              className="h-full flex flex-col"
            >
              <TabsList className="w-full rounded-none justify-start">
                <TabsTrigger value="testcases">Testcase</TabsTrigger>
                {isTestResultVisible && (
                  <TabsTrigger value="test-result">Test Result</TabsTrigger>
                )}
              </TabsList>
              <TabsContent value="testcases">
                <div className="px-2">
                  <Tabs defaultValue="test-1" className="h-full flex flex-col">
                    <TabsList className="w-full rounded-none justify-start">
                      {testcases.map((_testcase, index) => (
                        <TabsTrigger key={index} value={`test-${index + 1}`}>
                          Case {index + 1}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    {testcases.map((testcase, index) => (
                      <TabsContent key={index} value={`test-${index + 1}`}>
                        {testcase.input.map(
                          (item: { field: string; value: string }) => (
                            <div key={item.field}>
                              {item.field} ={" "}
                              <Input
                                value={item.value}
                                onChange={(event) => {
                                  setTestcases((prev) => {
                                    const newTestcases = [...prev];
                                    newTestcases[index].input = newTestcases[
                                      index
                                    ].input.map((i) =>
                                      i.field === item.field
                                        ? { ...i, value: event.target.value }
                                        : i
                                    );
                                    return newTestcases;
                                  });
                                }}
                              />
                            </div>
                          )
                        )}
                      </TabsContent>
                    ))}
                  </Tabs>
                </div>
              </TabsContent>
              <TabsContent value="test-result">
                <div className="px-2">
                  <Tabs
                    defaultValue="test-result-1"
                    className="h-full flex flex-col"
                  >
                    <TabsList className="w-full rounded-none justify-start">
                      {testResult.map((_testcase, index) => (
                        <TabsTrigger
                          key={index}
                          value={`test-result-${index + 1}`}
                        >
                          Case {index + 1}{" "}
                          <span
                            className={cn("text-xs", {
                              "text-green-500":
                                testResult[index].status === "Accepted",
                              "text-red-500":
                                testResult[index].status !== "Accepted",
                            })}
                          >
                            ({testResult[index].status})
                          </span>
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    {testResult.map((testcase, index) => (
                      <TabsContent
                        key={index}
                        value={`test-result-${index + 1}`}
                      >
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-500">
                              Output
                            </p>
                            <Input value={testcase.output} />
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-500">
                              Expected
                            </p>
                            <Input value={testcase.expectedOutput} />
                          </div>
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </div>
              </TabsContent>
            </Tabs>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
