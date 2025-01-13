import { createFileRoute } from "@tanstack/react-router";
import {
  ListPlusIcon,
  MessageCircleCodeIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeEditor } from "@/features/problems/components/code-editor";

export const Route = createFileRoute("/_authed/problems/_screen/$slug")({
  loader: async ({ params }) => {
    const problems = {
      index: 1,
      slug: params.slug,
      title: "Word Subsets",
      difficulty: "Medium",
      topics: [
        {
          slug: "array",
          name: "Array",
        },
        {
          slug: "string",
          name: "String",
        },
        {
          slug: "hash-table",
          name: "Hash Table",
        },
      ],
      description:
        "Given two arrays of strings, A and B, determine all elements in A that are universal to all strings in B.",
    };

    return {
      problems,
    };
  },
  component: RouteComponent,
  errorComponent: ({ error }) => <div>{JSON.stringify(error)}</div>,
});

function RouteComponent() {
  const { problems } = Route.useLoaderData();
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="rounded-lg border bg-gray-900"
    >
      <ResizablePanel defaultSize={50} minSize={25}>
        <Tabs defaultValue="description" className="h-full flex flex-col">
          <TabsList className="w-full rounded-none justify-start">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="solutions">Solutions</TabsTrigger>
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
          </TabsList>
          <TabsContent
            value="description"
            className="px-4 py-6 relative flex-1 space-y-4"
          >
            <h1 className="text-2xl font-semibold">
              {problems.index}. {problems.title}
            </h1>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-yellow-500">
                {problems.difficulty}
              </Badge>
              {problems.topics.map((topic) => (
                <Badge variant="secondary" key={topic.slug}>
                  {topic.name}
                </Badge>
              ))}
            </div>
            <p>{problems.description}</p>
            <Accordion type="multiple">
              <AccordionItem value="item-1">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-1 font-semibold">
                    <ListPlusIcon />
                    Similar questions (22)
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-1 font-semibold">
                    <MessageCircleCodeIcon />
                    Discussion (147)
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="absolute left-0 bottom-0 w-full px-4 py-2 flex gap-0.5">
              <Button variant="secondary" className="rounded-lg rounded-r-none">
                <ThumbsUpIcon />
                1.5k
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="rounded-lg rounded-l-none"
              >
                <ThumbsDownIcon />
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="solutions">solutions tab.</TabsContent>
          <TabsContent value="submissions">submission tab.</TabsContent>
        </Tabs>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={70}>
            <div className="flex h-full items-center justify-center p-6">
              <CodeEditor />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={30}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Three</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
