'use client';

import { useRef } from 'react';
import Editer from './editer';
import Toolbar from './toolbar';
import { Editor } from '@tiptap/react';
import { use } from 'react';
import Ruler from './ruler';
import Navbar from './navbar';

interface Props {
  params: Promise<{ documentId: string }>;
}
function DocumentPage({ params }: Props) {
  const editorRef = useRef<Editor>();
  const { documentId } = use(params);
  console.log(documentId);

  return (
    <div className="tiptap-container min-h-screen bg-[#FAFBFD]">
      <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg=[#FAFBFD] print:hidden">
        <Navbar />
        <Toolbar />
      </div>
      <div className="pt-[114px] print:pt-0">
        <Ruler />
        <Editer
          ref={(editor) => {
            if (editor !== null) editorRef.current = editor;
          }}
        />
      </div>
    </div>
  );
}

export default DocumentPage;
