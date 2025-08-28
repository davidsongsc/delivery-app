import React, { useState, useRef, useEffect } from "react";
import { FaServer } from "react-icons/fa";
import { DownOutlined } from '@ant-design/icons';

interface SectionSeparatorProps {
  title: string;
  children?: React.ReactNode;
  expanded?: boolean;
}

const SectionSeparator: React.FC<SectionSeparatorProps> = ({ title, children, expanded = true }) => {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | "auto">(0);

  const toggleExpanded = () => setIsExpanded(prev => !prev);

  useEffect(() => {
    if (contentRef.current) {
      // Transição suave da altura
      setHeight(isExpanded ? contentRef.current.scrollHeight : 0);
    }
  }, [isExpanded, children]);

  return (
    <div className="w-full h-auto mb-2 transition-all duration-300">
      <div
        className={`flex justify-between items-center bg-secondary p-4 cursor-pointer select-none
                    shadow-lg transition-shadow duration-300 hover:shadow-xl
                    ${isExpanded ? "rounded-t-xl border-b-0 border border-gray-300" : "rounded-xl border border-gray-300"}
                    transition-colors duration-300`}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        aria-controls="section-content"
        onClick={toggleExpanded}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleExpanded();
          }
        }}
      >
        <div className="flex items-center gap-3 transition-colors duration-300">
          <FaServer className="text-primary transition-colors duration-300" size={20} />
          <h3 className="text-tertiary font-bold text-lg">{title}</h3>
        </div>
        <DownOutlined
          className={`text-primary transition-transform duration-300 ease-in-out ${isExpanded ? "rotate-180" : "rotate-0"}`}
          aria-hidden="true"
        />
      </div>

      {/* Conteúdo */}
      <div
        id="section-content"
        ref={contentRef}
        style={{ height, overflow: "hidden", transition: "height 300ms ease" }}
        aria-hidden={!isExpanded}
      >
        <div
          className={` bg-secondary transition-all duration-300
                      ${isExpanded ? "rounded-b-xl border border-t-0 border-gray-300" : ""}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default React.memo(SectionSeparator);
