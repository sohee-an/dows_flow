import { useEditorStore } from "@/store/use-editor-store";

import React from "react";
import ToolbarDropDownMenu from "./ToolbarDropdownMenu";
const headings = [
  { label: "Normal text", value: 0, fontSize: "16px" },
  { label: "Heading 1", value: 1, fontSize: "32px" },
  { label: "Heading 2", value: 2, fontSize: "24px" },
  { label: "Heading 3", value: 3, fontSize: "20px" },
  { label: "Heading 4", value: 4, fontSize: "16px" },
  { label: "Heading 5", value: 5, fontSize: "14px" },
  { label: "Heading 6", value: 6, fontSize: "12px" },
] as const;

//타입쪽이 좀......
// export type Level = Extract<(typeof headings)[number]["value"], number>;

export default function HeadingLevelButton() {
  const { editor } = useEditorStore();

  const getCurrentHeading = () => {
    const activeHeading = headings.find(({ value }) =>
      editor?.isActive("heading", { level: value })
    );

    return activeHeading ? activeHeading.label : "Normal text";
  };

  const setHeadingLevel = (level: number) => {
    console.log(level);
    if (editor) {
      if (level === 0) {
        editor.chain().focus().setParagraph().run();
      } else {
        editor
          .chain()
          .focus()
          .toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 })
          .run();
      }
    }
  };

  return (
    <ToolbarDropDownMenu
      menuList={[...headings]}
      getMeunName={getCurrentHeading}
      onSelect={setHeadingLevel}
    />
  );
}
