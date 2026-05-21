import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Button } from './ui/button';
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Redo,
  Undo,
  Smile,
} from 'lucide-react';
import './RichEditor.css';

interface RichEditorProps {
  value: string;
  onChange: (content: string) => void;
}

export default function RichEditor({ value, onChange }: RichEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const ToolbarButton = ({
    isActive,
    onClick,
    icon: Icon,
    title,
  }: {
    isActive?: boolean;
    onClick: () => void;
    icon: React.ComponentType<{ size: number }>;
    title: string;
  }) => (
    <button
      onClick={onClick}
      title={title}
      className={`toolbar-btn ${isActive ? 'active' : ''}`}
    >
      <Icon size={18} />
    </button>
  );

  return (
    <div className="rich-editor-wrapper">
      <div className="editor-toolbar">
        <div className="toolbar-group">
          <ToolbarButton
            isActive={editor.isActive('bold')}
            onClick={() => editor.chain().focus().toggleBold().run()}
            icon={Bold}
            title="Bold (Ctrl+B)"
          />
          <ToolbarButton
            isActive={editor.isActive('italic')}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            icon={Italic}
            title="Italic (Ctrl+I)"
          />
        </div>

        <div className="toolbar-divider" />

        <div className="toolbar-group">
          <ToolbarButton
            isActive={editor.isActive('heading', { level: 2 })}
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            icon={Heading2}
            title="Heading 2"
          />
          <ToolbarButton
            isActive={editor.isActive('heading', { level: 3 })}
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            icon={Heading3}
            title="Heading 3"
          />
        </div>

        <div className="toolbar-divider" />

        <div className="toolbar-group">
          <ToolbarButton
            isActive={editor.isActive('bulletList')}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            icon={List}
            title="Bullet List"
          />
          <ToolbarButton
            isActive={editor.isActive('orderedList')}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            icon={ListOrdered}
            title="Ordered List"
          />
        </div>

        <div className="toolbar-divider" />

        <div className="toolbar-group">
          <ToolbarButton
            isActive={editor.isActive('blockquote')}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            icon={Quote}
            title="Quote"
          />
          <ToolbarButton
            isActive={editor.isActive('codeBlock')}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            icon={Code}
            title="Code Block"
          />
        </div>

        <div className="toolbar-divider" />

        <div className="toolbar-group">
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            icon={Undo}
            title="Undo"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            icon={Redo}
            title="Redo"
          />
        </div>
      </div>

      <EditorContent editor={editor} className="editor-content" />
    </div>
  );
}
