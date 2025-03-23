'use client';
import React from 'react';
import DocumentInput from './document-input';
import Link from 'next/link';
import {
  Menubar,
  MenubarSeparator,
  MenubarSub,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@radix-ui/react-menubar';
import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarSubContent,
} from '@/components/ui/menubar';
import {
  BoldIcon,
  FileIcon,
  FileJsonIcon,
  FilePenIcon,
  FilePlusIcon,
  FileTextIcon,
  GlobeIcon,
  ItalicIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  StrikethroughIcon,
  TextIcon,
  TrashIcon,
  Undo2Icon,
} from 'lucide-react';
import { BsFilePdf } from 'react-icons/bs';

export default function Navbar() {
  return (
    <div className="p-2">
      <div className="flex gap-2">
        <Link href="/">
          <div className=" header">Docs Flow</div>
        </Link>

        <DocumentInput />
      </div>

      <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent className="print:hidden">
            <MenubarSub>
              <MenubarSubTrigger className="flex items-center pl-2">
                <FileIcon className="size-4 mr-2" />
                Save
              </MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>
                  <FileJsonIcon className="size-4 mr-2" />
                  JSON
                </MenubarItem>
                <MenubarItem>
                  <GlobeIcon className="size-4 mr-2" />
                  HTML
                </MenubarItem>
                <MenubarItem>
                  <BsFilePdf className="size-4 mr-2" />
                  PDF
                </MenubarItem>
                <MenubarItem>
                  <FileTextIcon className="size-4 mr-2" />
                  Text
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarItem>
              <FilePlusIcon className="size-4 mr-2" />
              New Document
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              <FilePenIcon className="size-4 mr-2" />
              Rename
            </MenubarItem>
            <MenubarItem>
              <TrashIcon className="size-4 mr-2" />
              Remove
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={() => window.print()}>
              <PrinterIcon className="size-4 mr-2" />
              Print <MenubarShortcut>cmd+P</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
            Edit
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <Undo2Icon className="size-2 mr-2" />
              Undo <MenubarShortcut>WZ</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              <Redo2Icon className="size-2 mr-2" />
              Redo <MenubarShortcut>WY</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
            Insert
          </MenubarTrigger>
          <MenubarContent>
            <MenubarSub>
              <MenubarSubTrigger>Table</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>1 x 1</MenubarItem>
                <MenubarItem>2 x 2</MenubarItem>
                <MenubarItem>3 x 3</MenubarItem>
                <MenubarItem>4 x 4</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
            Format
          </MenubarTrigger>
          <MenubarContent>
            <MenubarSub>
              <MenubarSubTrigger>
                <TextIcon className="size-4 mr-2" />
                Text
              </MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>
                  <BoldIcon className="size-4 mr-2" />
                  Bold <MenubarShortcut>cmd + B</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  <ItalicIcon className="size-4 mr-2" />
                  Italic <MenubarShortcut>cmd + I</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  <BoldIcon className="size-4 mr-2" />
                  Underline <MenubarShortcut>cmd + U</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  <StrikethroughIcon className="size-4 mr-2" />
                  <span>Strikethrough&nbsp;</span>
                  <MenubarShortcut>cmd + S</MenubarShortcut>
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarItem>
              <RemoveFormattingIcon className="size-4 mr-2" />
              Clear formatting
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}
