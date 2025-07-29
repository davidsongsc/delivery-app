"use client";

import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./styles.css";

interface IRichEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  isActive?: boolean;
}

const modules = {
  toolbar: [
    ["bold", "italic",],
    
  ],
};

const formats = [
  "bold",
  "italic",
];

const RichEditor: React.FC<IRichEditorProps> = ({
  value,
  onChange,
  isActive = true,
}) => {
  return (
    <ReactQuill
      readOnly={!isActive}
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
      placeholder="Adicione seu comentário aqui"
    />
  );
};

export default React.memo(RichEditor);
