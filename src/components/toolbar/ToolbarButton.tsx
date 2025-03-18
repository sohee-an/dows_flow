import { cn } from '@/lib/utils';
import React from 'react';
import { LucideIcon } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '../ui/button';

type ToolbarButtonProps = {
  onClick?: () => void;
  isActive?: boolean;
  children: React.ReactNode;
  icon: LucideIcon;
  ariaLabel?: string;
  title?: string;
};

function ToolbarButton({
  onClick,
  isActive,

  children,
  icon: Icon,
  ariaLabel,
  title,
}: ToolbarButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            aria-label={ariaLabel}
            onClick={onClick}
            className={cn(
              'text-sm h-7 p-0 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80',
              isActive && 'bg-neutral-200/80'
            )}
          >
            {/* {children} */}
            <Icon></Icon>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default ToolbarButton;
