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
    [{ header: [1, 2, 3, false] }],        // Títulos H1, H2, H3, Normal
    ["bold", "italic", "underline", "strike"], // Negrito, itálico, sublinhado, riscado
    [{ color: [] }, { background: [] }],   // Cor do texto e fundo
    [{ list: "ordered" }, { list: "bullet" }], // Listas
    [{ indent: "-1" }, { indent: "+1" }], // Recuo
    [{ align: [] }],                       // Alinhamento: left, center, right, justify
    ["link", "image", "video"],            // Inserir link, imagem, vídeo
    ["blockquote", "code-block"],          // Citação e bloco de código
    ["clean"],                             // Remove formatação
  ],
};


const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "align",
  "link",
  "image",
  "video",
  "blockquote",
  "code-block",
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
