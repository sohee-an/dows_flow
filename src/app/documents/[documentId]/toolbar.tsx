"use client";
import {
  LucideIcon,
  Undo2Icon,
  Redo2Icon,
  PrinterIcon,
  SpellCheckIcon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  MessageSquarePlusIcon,
  ListTodoIcon,
  RemoveFormattingIcon,
} from "lucide-react";
import { useEditorStore } from "@/store/use-editor-store";
import { Separator } from "@/components/ui/separator";
import HeadingLevelButton from "@/components/toolbar/HeadingLevelButton";
import ToolbarButton from "@/components/toolbar/ToolbarButton";
import { FontFamilyButton } from "@/components/toolbar/FontFamilyButton";
import TextColorButton from "@/components/toolbar/TextColorButton";
import HighlightColorButton from "@/components/toolbar/HighlightColorButton";
import LinkButton from "@/components/toolbar/LinkButton";
import ImageButton from "@/components/toolbar/ImageButton";
import AlignButton from "@/components/toolbar/AlignButton";
import ListButton from "@/components/toolbar/ListButton";
import FontSizeButton from "@/components/toolbar/FontSizeButton";
import LineHeightButton from "@/components/toolbar/LineHeightButton";

export default function Toolbar() {
  const { editor } = useEditorStore();

  const sections: {
    label: string;
    icon: LucideIcon;
    isActive?: boolean;
    onClick: () => void;
    ariaLabel?: string;
    title?: string;
  }[][] = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        title: "Undo",
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: "Redo",
        icon: Redo2Icon,
        title: "Redo",
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: "Print",
        title: "Print",
        icon: PrinterIcon,
        onClick: () => window.print(),
      },

      {
        label: "Spell Check",
        title: "Spell Check",
        icon: SpellCheckIcon,
        onClick: () => {
          const current = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute(
            "spellcheck",
            current === "false" ? "true" : "false"
          );
        },
      },
    ],
    [
      {
        label: "Bold",
        title: "Bold",
        icon: BoldIcon,
        ariaLabel: "Bold",
        onClick: () => {
          editor?.chain().focus().toggleBold().run();
        },
      },
      {
        label: "Italic",
        title: "Italic",
        icon: ItalicIcon,
        ariaLabel: "Italic",
        isActive: editor?.isActive("italic"),
        onClick: () => {
          editor?.chain().focus().toggleItalic().run();
        },
      },
      {
        label: "UnderLine",
        title: "UnderLine",
        ariaLabel: "UnderLine",
        icon: UnderlineIcon,
        isActive: editor?.isActive("underline"),
        onClick: () => {
          editor?.chain().focus().toggleUnderline().run();
        },
      },
    ],
    [
      {
        label: "Comment",
        title: "Comment",
        ariaLabel: "Comment",
        icon: MessageSquarePlusIcon,
        onClick: () => console.log("hi"),
        isActive: false,
      },
      {
        label: "List Todo",
        title: "List Todo",
        ariaLabel: "List Todo",
        icon: ListTodoIcon,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive("taskList"),
      },
      {
        label: "Remove Formatting ",
        title: "Remove Formatting",
        ariaLabel: "Remove Formatting",
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
        isActive: editor?.isActive("taskList"),
      },
    ],
  ];

  return (
    <div className="toolbar bg-[#F1F4F9] px-3 py-0/5 rounded-[24px] p min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
      {sections[0].map((item) => {
        return <ToolbarButton key={item.label} {...item} />;
      })}
      <Separator orientation="vertical" className="h-6" />
      {sections[1].map((item) => {
        return <ToolbarButton key={item.label} {...item} />;
      })}

      <TextColorButton />
      <HighlightColorButton />
      <Separator orientation="vertical" className="h-6" />
      <FontFamilyButton />
      <Separator orientation="vertical" className="h-6" />
      <HeadingLevelButton />
      <Separator orientation="vertical" className="h-6" />
      <FontSizeButton />

      <Separator orientation="vertical" className="h-6" />
      <LinkButton />
      <ImageButton />
      <AlignButton />
      <ListButton />
      <LineHeightButton />
      {/* 코멘트쪽  */}
      <Separator orientation="vertical" className="h-6" />
      {sections[2].map((item) => {
        return <ToolbarButton key={item.label} {...item} />;
      })}
    </div>
  );
}
