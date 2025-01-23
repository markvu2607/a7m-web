import { Button } from "@/components/ui/button";

type CodeActionProps = {
  onRun: () => void;
  onSubmit: () => void;
};

export const CodeAction = (props: CodeActionProps) => {
  return (
    <div className="flex justify-end gap-2">
      <Button variant="outline" onClick={props.onRun}>
        Run
      </Button>
      <Button variant="secondary" onClick={props.onSubmit}>
        Submit
      </Button>
    </div>
  );
};
