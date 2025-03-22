import { motion } from "motion/react";

import { Button } from "@/components/ui/button";

type CodeActionProps = {
  isRunning: boolean;
  onRun: () => void;
  isSubmitting: boolean;
  onSubmit: () => void;
};

export const CodeAction = ({
  isRunning,
  onRun,
  isSubmitting,
  onSubmit,
}: CodeActionProps) => {
  return (
    <div className="flex justify-end gap-2 px-2">
      <Button
        variant="outline"
        disabled={isRunning || isSubmitting}
        onClick={onRun}
      >
        {isRunning && (
          <motion.div
            className="size-4 bg-white rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
        Run
      </Button>
      <Button
        variant="secondary"
        className="border-none"
        disabled={isRunning || isSubmitting}
        onClick={onSubmit}
      >
        {isSubmitting && (
          <motion.div
            className="size-4 bg-white rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
        Submit
      </Button>
    </div>
  );
};
