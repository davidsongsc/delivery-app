"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  IoChevronBackSharp,
  IoEyeOffOutline,
  IoChevronUp,
  IoFilter,
} from "react-icons/io5";
import { CSSTransition } from "react-transition-group";
import "./styles.css"; // Arquivo CSS para transições

interface PageTitleProps {
  title: string;
  subtitle?: string;
  navTitle?: string;
  action?: React.ReactNode;
  hasBackButton?: boolean;
  className?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({
  title,
  subtitle,
  navTitle,
  action,
  hasBackButton = false,
  className,
}) => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => setIsVisible(prev => !prev);

  return (
    <>
      <CSSTransition
        in={isVisible}
        timeout={300}
        classNames="page-title"
        unmountOnExit
      >
        <div
          className={`
            flex flex-col sm:flex-row sm:items-center sm:justify-between 
            py-4 px-2 sm:px-3 lg:px-4 left-0 w-full z-50
            bg-secondary text-option rounded-sm mx-auto 
            ${className || ""}
          `}
        >
          <div className="flex items-center mb-2 sm:mb-0">
            {hasBackButton && (
              <IoChevronBackSharp
                size={40}
                className="mr-2 cursor-pointer hover:scale-110 text-option transition-transform duration-200 bg-primary rounded-full p-1"
                onClick={() => router.back()}
              />
            )}
            <div >
              {navTitle && (
                <p className="text-sm opacity-75 text-tertiary ">{navTitle}</p>
              )}
              <h1 className="text-2xl md:text-3xl 2xl:text-4xl font-extrabold tracking-tight text-textoSeparador capitalize">
                {title}
              </h1>
              <h2 className="text-md sm:text-sm opacity-75">
                {subtitle}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="text-primary hover:text-primary transition-transform flex items-center gap-1 xl:hidden"
              onClick={toggleVisibility}
              title="Ocultar título"
            >
              <IoFilter size={48} />

            </button>
            {action && <div className="flex-shrink-0">{action}</div>}
          </div>
        </div>
      </CSSTransition>

      {!isVisible && (
        <div
          className="fixed bottom-6 right-6 z-50 bg-textoSeparador text-white p-3 rounded-full shadow-lg cursor-pointer hover:scale-105 transition-transform"
          onClick={toggleVisibility}
          title="Exibir título"
        >
          <IoChevronUp size={24} />
        </div>
      )}
    </>
  );
};

export default React.memo(PageTitle);
