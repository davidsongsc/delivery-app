"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { IoChevronBackSharp } from "react-icons/io5";

interface PageTitleProps {
  title: string;
  navTitle?: string; // Made optional as it might not always be needed for prominence
  action?: React.ReactNode;
  hasBackButton?: boolean;
  className?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({
  title,
  navTitle,
  action,
  hasBackButton = false,
  className,
}) => {
  const router = useRouter();

  return (
    <div
      className={`
        flex flex-col sm:flex-row sm:items-center sm:justify-between my-6
        py-6 px-2 sm:px-3 lg:px-4
        bg-secondary text-primary rounded-lg shadow-lg 
        ${className || ''}
      `}
    >
      <div className="flex items-center mb-4 sm:mb-0">
        {hasBackButton && (
          <IoChevronBackSharp
            size={40} 
            className="mr-3 cursor-pointer hover:scale-110 text-secondary transition-transform duration-200 bg-primary rounded-full p-1"
            onClick={() => router.back()}
          />
        )}
        <div>
          {navTitle && (
            <p className="text-sm opacity-75 mb-1">{navTitle}</p> 
          )}
          <h1 className="text-3xl sm:text-2xl font-extrabold tracking-tight">
            {title}
          </h1>
        </div>
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
};

export default React.memo(PageTitle);