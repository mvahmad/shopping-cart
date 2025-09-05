"use client";

import { Editor } from "@tinymce/tinymce-react";
import { API_KEY } from "@/app/constant";

interface TextEditorProps {
  value: string;
  onChange: (content: string) => void;
}

export default function EditorClient({value,onChange}:TextEditorProps) {
  return (
    <Editor
      vlaue={value}
      onEditorChange={(content: string) => onChange(content)}
      apiKey={API_KEY }
      init={{
        height: 500,
         plugins: [
          "anchor",
          "autolink",
          "charmap",
          "codesample",
          "emoticons",
          "image",
          "link",
          "lists",
          "media",
          "searchreplace",
          "visualblocks",
        ],
        toolbar:
          "undo redo | formatselect | bold italic emoticons | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent",
        skin: "",
        content_css: "white",
         tinycomments_mode: "embedded",
        tinycomments_author: "Author name",
        mergetags_list: [
          { value: "First.Name", title: "First Name" },
          { value: "Email", title: "Email" },
        ],
      }}
    />
  );
}