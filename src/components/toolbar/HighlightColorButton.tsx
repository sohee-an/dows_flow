import { useEditorStore } from '@/store/use-editor-store';
import React from 'react';
import { SketchPicker, type ColorResult } from 'react-color';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { cn } from '@/lib/utils';
import { HighlighterIcon } from 'lucide-react';

export default function HighlightColorButton() {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes('highlight').color || '#FFFFF';

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({ color: color.hex }).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="Highlight-color"
          title="Highlight-color"
          className={cn(
            'h-7 min-w-7  flex-col shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'
          )}
        >
          <HighlighterIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5 z-10 bg-white">
        <SketchPicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
