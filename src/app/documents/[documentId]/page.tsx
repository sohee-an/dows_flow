'use client';

import { useRef } from 'react';
import Editer from './editer';
import Toolbar from './toolbar';
import { Editor } from '@tiptap/react';
import { use } from 'react';

interface Props {
  params: Promise<{ documentId: string }>;
}
function DocumentPage({ params }: Props) {
  const editorRef = useRef<Editor>();
  const { documentId } = use(params);

  return (
    <div className="tiptap-container min-h-screen bg-[#FAFBFD]">
      <Toolbar />
      <Editer
        ref={(editor) => {
          if (editor !== null) editorRef.current = editor;
        }}
      />
    </div>
  );
}

export default DocumentPage;
