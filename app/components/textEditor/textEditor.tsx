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
      apiKey="kxtfss3z9dyd5by4dv4ni5dx3a6b6ke7mmqu1kxbp3j2wp56"
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