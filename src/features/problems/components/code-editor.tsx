import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

type CodeEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export const CodeEditor = ({ value, onChange }: CodeEditorProps) => {
  const extensions = [python()];

  return (
    <CodeMirror
      value={value}
      theme={vscodeDark}
      extensions={extensions}
      onChange={onChange}
      className="flex-1 [&>.cm-editor]:h-full"
    />
  );
};
