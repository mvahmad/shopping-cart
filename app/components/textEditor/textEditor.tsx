"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import { Bold, Italic, LinkIcon, List, ListOrdered, Type } from "lucide-react";
import { Button } from "@nextui-org/react";

interface TextEditorProps {
  value?: string;
  onChange: (content: string) => void;
}

const defaultDoc = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [{ type: "text", text: "" }],
    },
  ],
};

export default function EditorClient({ value, onChange }: TextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      BulletList,
      OrderedList,
      ListItem,
    ],
   content: value ? value : defaultDoc,
  onUpdate: ({ editor }) => {
    onChange(JSON.stringify(editor.getJSON()));
  },
  immediatelyRender: false,
  });

  if (!editor) return null;

  return (
    <div className="border border-gray-300 rounded-md w-full p-3">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 mb-2 border-b border-gray-200 pb-2">
        <Button
          size="sm"
          variant={editor.isActive("bold") ? "solid" : "bordered"}
          onPress={() => editor.chain().focus().toggleBold().run()}
          startContent={<Bold size={16} />}
        >
          Bold
        </Button>
        <Button
          size="sm"
          variant={editor.isActive("italic") ? "solid" : "bordered"}
          onPress={() => editor.chain().focus().toggleItalic().run()}
          startContent={<Italic size={16} />}
        >
          Italic
        </Button>
        <Button
          size="sm"
          onPress={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({ level: 2 })
              .run()
          }
          startContent={<Type size={16} />}
          variant={editor.isActive("heading", { level: 2 }) ? "solid" : "bordered"}
        >
          H2
        </Button>
        <Button
          size="sm"
          onPress={() => editor.chain().focus().toggleBulletList().run()}
          startContent={<List size={16} />}
          variant={editor.isActive("bulletList") ? "solid" : "bordered"}
        >
          Bulleted
        </Button>
        <Button
          size="sm"
          onPress={() => editor.chain().focus().toggleOrderedList().run()}
          startContent={<ListOrdered size={16} />}
          variant={editor.isActive("orderedList") ? "solid" : "bordered"}
        >
          Numbered
        </Button>
        <Button
          size="sm"
          startContent={<LinkIcon size={16} />}
          onPress={() => {
            const url = prompt("Enter URL:");
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
        >
          Link
        </Button>
      </div>

      {/* Editor Content */}
      <EditorContent   editor={editor} className="min-h-[200px] focus:outline-none" />
    </div>
  );
}
