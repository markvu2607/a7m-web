import {
  ListPlusIcon,
  MessageCircleCodeIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "lucide-react";
import { Problem } from "../types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Props = {
  problem: Problem;
};

export const ProblemDescription = ({ problem }: Props) => {
  return (
    <>
      <h1 className="text-2xl font-semibold">
        {problem.index}. {problem.title}
      </h1>
      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary" className="text-yellow-500 capitalize">
          {problem.difficulty.toLocaleLowerCase()}
        </Badge>
        {/* {problems.topics.map((topic) => (
                <Badge variant="secondary" key={topic.slug}>
                  {topic.name}
                </Badge>
              ))} */}
      </div>
      <p>{problem.description}</p>
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
    </>
  );
};
