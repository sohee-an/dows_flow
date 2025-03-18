import { useEditorStore } from '@/store/use-editor-store';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { cn } from '@/lib/utils';
import { AlignJustifyIcon, AlignLeftIcon, AlignRightIcon } from 'lucide-react';

//

const alilgnments = [
  {
    label: 'Align Left',
    value: 'left',
    arialabel: 'align left',
    icon: AlignLeftIcon,
  },
  {
    label: 'Align Center',
    value: 'center',
    arialabel: 'align left',
    icon: AlignRightIcon,
  },
  {
    label: 'Align Right',
    value: 'right',
    arialabel: 'align left',
    icon: AlignJustifyIcon,
  },
];

export default function AlignButton() {
  const { editor } = useEditorStore();

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
          <AlignLeftIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1 z-10 bg-white">
        {alilgnments.map(({ label, value, icon: Icon, arialabel }) => (
          <button
            aria-label={arialabel}
            key={value}
            onClick={() => editor?.chain().focus().setTextAlign(value).run()}
            className={cn(
              'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
              editor?.isActive({ textAlign: value }) && 'bg-neutral-200/80'
            )}
          >
            <Icon className="size-4" />
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
