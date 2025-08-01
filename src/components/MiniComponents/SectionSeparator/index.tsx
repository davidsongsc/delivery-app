import React, { useState, useRef, useEffect } from "react";
import { FaServer } from "react-icons/fa";
import { DownOutlined } from '@ant-design/icons';

interface SectionSeparatorProps {
  title: string;
  children?: React.ReactNode;
}

const SectionSeparator: React.FC<SectionSeparatorProps> = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<string | number>("auto");

  const toggleExpanded = () => {
    setIsExpanded(prev => !prev);
  };

  // Atualiza a altura para animação suave
  useEffect(() => {
    if (contentRef.current) {
      if (isExpanded) {
        setHeight(contentRef.current.scrollHeight);
      } else {
        setHeight(0);
      }
    }
  }, [isExpanded, children]);

  return (
    <>
      <div
        className="bg-darkModal rounded-sm px-4 py-4 my-1 grid grid-cols-12 shadow-md shadow-black/20
                    items-center cursor-pointer select-none shadow-md shadow-black/20"
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
        <h3 className="pl-8 text-primary text-lg font-bold col-span-11">{title}</h3>
        <div className="pr-8 col-span-1 flex items-center justify-end gap-2">
          <FaServer className="text-primary" size={20} />
          <DownOutlined
            className={`text-primary transition-transform duration-300 ease-in-out ${isExpanded ? "rotate-180" : "rotate-0"}`}
            aria-hidden="true"
          />
        </div>
      </div>

      <div
        id="section-content"
        ref={contentRef}
        style={{ height, overflow: "hidden", transition: "height 300ms ease" }}
        aria-hidden={!isExpanded}
      >
        <div className="pt-2">
          {children}
        </div>
      </div>
    </>
  );
};

export default React.memo(SectionSeparator);
