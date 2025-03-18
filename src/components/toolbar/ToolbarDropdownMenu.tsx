import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import React from "react";

type MenuItem<T> = {
  label: string;
  value: T;
};

type Props<T> = {
  menuList: MenuItem<T>[];
  getMeunName: () => string;
  onSelect: (value: T) => void;
};

export default function ToolbarDropDownMenu<T extends number | string>({
  menuList,
  getMeunName,
  onSelect,
}: Props<T>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="Heading level"
          title="Heading level"
          className={cn(
            "h-7 min-w-7 shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
          )}
        >
          <span className="truncate">{getMeunName()}</span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1 z-10 bg-white">
        {menuList.map(({ label, value }) => (
          <button
            key={value}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
              (value === 0 && getMeunName() === "Normal text") ||
                getMeunName() === label
                ? "bg-neutral-200/80"
                : "bg-white"
            )}
            onClick={() => onSelect(value)}
          >
            <span className="truncate">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
