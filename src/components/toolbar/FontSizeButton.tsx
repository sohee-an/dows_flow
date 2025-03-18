import { useEditorStore } from '@/store/use-editor-store';
import React, { useState } from 'react';
import { SketchPicker, type ColorResult } from 'react-color';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { cn } from '@/lib/utils';
import {
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  MinusIcon,
  PlusIcon,
} from 'lucide-react';
import { Input } from '../ui/input';

export default function FontSizeButton() {
  const { editor } = useEditorStore();
  const currentFontSize = editor?.getAttributes('textStyle').fontSize
    ? editor?.getAttributes('textStyle').fontSize.replace('px', '')
    : '16';
  const [fontSize, setFontSize] = useState(currentFontSize);
  const [inputValue, setInputValue] = useState(fontSize);
  const [isEditing, setIsEditing] = useState(false);

  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize);
    if (!isNaN(size) && size > 0) {
      editor?.chain().focus().setFontSize(`${size}px`).run();
      setFontSize(newSize);
      setInputValue(newSize);
      setIsEditing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    updateFontSize(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      updateFontSize(inputValue);
      editor?.commands.focus();
    }
  };

  const increment = () => {
    const newSize = parseInt(fontSize) + 1;
    updateFontSize(newSize.toString());
  };

  const decrement = () => {
    const newSize = parseInt(fontSize) - 1;
    if (newSize > 0) {
      updateFontSize(newSize.toString());
    }
  };

  const onChange = (newFontSize: any) => {
    setFontSize(newFontSize);
  };

  return (
    <div className="flex items-center gap-x-0.5">
      <button
        aria-label="fontsize decrement"
        onClick={decrement}
        className={cn(
          'h-7 w-7  shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 '
        )}
      >
        <MinusIcon className="size-4" />
      </button>

      {isEditing ? (
        <Input
          className={cn(
            'h-7 min-w-11  max-w-16 shrink-0 text-center text-sm border border-neutral-400 rounded-sm bg-transparent focus:outline-none focus:ring-0'
          )}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <button
          aria-label="fontsize increment"
          onClick={() => {
            setIsEditing(true);
            setFontSize(currentFontSize);
          }}
          className={cn(
            'h-7 min-w-11  max-w-16 shrink-0 text-center text-sm border border-neutral-400 rounded-sm hover:bg-neutral-200 cursor-text '
          )}
        >
          {currentFontSize}
        </button>
      )}

      <button
        aria-label="fontsize decrement"
        onClick={increment}
        className={cn(
          'h-7 w-7  shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 '
        )}
      >
        <PlusIcon className="size-4" />
      </button>
    </div>
  );
}
