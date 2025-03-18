import { useEditorStore } from '@/store/use-editor-store';
import ToolbarDropDownMenu from './ToolbarDropdownMenu';

export const FontFamilyButton = () => {
  const { editor } = useEditorStore();

  const fonts = [
    { label: 'Arial', value: 'Arial' },
    { label: 'Courier New', value: 'Courier New' },
    { label: 'Georgia', value: 'Georgia' },
    { label: 'Tahoma', value: 'Tahoma' },
    { label: 'Times New Roman', value: 'Times New Roman' },
    { label: 'Verdana', value: 'Verdana' },
  ] as const;

  const getFontFamily = () => {
    return editor?.getAttributes('textStyle')?.fontFamily || 'Arial';
  };

  const setFontFamily = (font: string) => {
    if (editor) {
      editor.chain().focus().setFontFamily(font).run();
    }
  };

  return (
    <ToolbarDropDownMenu
      menuList={[...fonts]}
      getMeunName={getFontFamily}
      onSelect={setFontFamily}
    />
  );
};
