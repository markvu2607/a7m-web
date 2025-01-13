import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

export const CodeEditor = () => {
  const extensions = [python()];
  return (
    <CodeMirror
      value={`print("Hello world!")`}
      theme={vscodeDark}
      extensions={extensions}
      height="100%"
    />
  );
};
