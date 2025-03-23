'use client';
import React, { useState } from 'react';
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
import { useEditorStore } from '@/store/use-editor-store';

export default function Navbar() {
  const { editor } = useEditorStore();

  const insertTable = ({ rows, cols }: { rows: number; cols: number }) => {
    editor
      ?.chain()
      .focus()
      .insertTable({ rows, cols, withHeaderRow: false })
      .run();
  };

  const onDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
  };

  const onSaveJSON = (filename: string) => {
    if (!editor) return;
    const content = editor.getJSON();
    const blob = new Blob([JSON.stringify(content)], {
      type: 'application/json',
    });

    onDownload(blob, `${filename}/json`);
  };

  const onSaveHTML = (filename: string) => {
    if (!editor) return;
    const content = editor.getHTML();
    const blob = new Blob([content], {
      type: 'text/html',
    });

    onDownload(blob, `${filename}/html`);
  };

  const onSaveText = (filename: string) => {
    if (!editor) return;
    const content = editor.getText();
    const blob = new Blob([content], {
      type: 'text/plain',
    });

    onDownload(blob, `${filename}.txt`);
  };

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
                <MenubarItem
                  onClick={() => {
                    const filename = prompt(
                      '파일 이름을 입력하세요:',
                      '내 문서'
                    );
                    if (filename) onSaveJSON(filename);
                  }}
                >
                  <FileJsonIcon className="size-4 mr-2" />
                  JSON
                </MenubarItem>
                <MenubarItem
                  onClick={() => {
                    const filename = prompt(
                      '파일 이름을 입력하세요:',
                      '내 문서'
                    );
                    if (filename) onSaveHTML(filename);
                  }}
                >
                  <GlobeIcon className="size-4 mr-2" />
                  HTML
                </MenubarItem>
                <MenubarItem onClick={() => window.print()}>
                  <BsFilePdf className="size-4 mr-2" />
                  PDF
                </MenubarItem>
                <MenubarItem
                  onClick={() => {
                    const filename = prompt(
                      '파일 이름을 입력하세요:',
                      '내 문서'
                    );
                    if (filename) onSaveText(filename);
                  }}
                >
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
            <MenubarItem onClick={() => editor?.chain().focus().undo().run()}>
              <Undo2Icon className="size-2 mr-2" />
              Undo <MenubarShortcut>WZ</MenubarShortcut>
            </MenubarItem>
            <MenubarItem onClick={() => editor?.chain().focus().redo().run()}>
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
                <MenubarItem onClick={() => insertTable({ rows: 1, cols: 1 })}>
                  1 x 1
                </MenubarItem>
                <MenubarItem onClick={() => insertTable({ rows: 2, cols: 2 })}>
                  2 x 2
                </MenubarItem>
                <MenubarItem onClick={() => insertTable({ rows: 3, cols: 3 })}>
                  3 x 3
                </MenubarItem>
                <MenubarItem onClick={() => insertTable({ rows: 4, cols: 4 })}>
                  4 x 4
                </MenubarItem>
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
                <MenubarItem
                  onClick={() => editor?.chain().focus().toggleBold().run()}
                >
                  <BoldIcon className="size-4 mr-2" />
                  Bold <MenubarShortcut>cmd + B</MenubarShortcut>
                </MenubarItem>
                <MenubarItem
                  onClick={() => editor?.chain().focus().toggleItalic().run()}
                >
                  <ItalicIcon className="size-4 mr-2" />
                  Italic <MenubarShortcut>cmd + I</MenubarShortcut>
                </MenubarItem>
                <MenubarItem
                  onClick={() =>
                    editor?.chain().focus().toggleUnderline().run()
                  }
                >
                  <BoldIcon className="size-4 mr-2" />
                  Underline <MenubarShortcut>cmd + U</MenubarShortcut>
                </MenubarItem>
                <MenubarItem
                  onClick={() => editor?.chain().focus().toggleStrike().run()}
                >
                  <StrikethroughIcon className="size-4 mr-2" />
                  <span>Strikethrough&nbsp;</span>
                  <MenubarShortcut>cmd + S</MenubarShortcut>
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarItem
              onClick={() => editor?.chain().focus().unsetAllMarks().run()}
            >
              <RemoveFormattingIcon className="size-4 mr-2" />
              Clear formatting
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}
