"use client";//

interface TextEditorProps {
  value: string;
  onChange: (content: string) => void;
}
import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function EditorClient({value,onChange}:TextEditorProps)  {
  return (
    <Editor
      apiKey='uk6dpn0k528ryu0snxv3wysx9pcqb3az0u8xsvcfpebbhgzo'
      vlaue={value}
      onEditorChange={(content: string) => onChange(content)}
      
      init={{
        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
      }}
      initialValue={value}
    />
  );
}