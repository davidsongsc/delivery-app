"use client";

import React from "react";
import DOMPurify from "dompurify";

interface DescricaoStylesProps {
  value?: string;
  className?: string;
  lines?: number; // quantidade de linhas para line-clamp
}

const DescricaoStyles: React.FC<DescricaoStylesProps> = ({
  value,
  className = "",
  lines = 2,
}) => {
  const sanitizedHTML = value
    ? DOMPurify.sanitize(value, {
        ALLOWED_TAGS: [
          "b", "i", "s", "u", "em", "strong",
          "ul", "ol", "li", "a", "br"
        ],
        ALLOWED_ATTR: ["href", "target", "rel"],
      })
    : "Sem descrição.";

  return (
    <p
      className={`text-gray-600 text-sm flex-1 line-clamp-${lines} ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
    />
  );
};

export default React.memo(DescricaoStyles);
