import React, { useState } from "react";
import { FaServer } from "react-icons/fa";
import { DownOutlined, UpOutlined } from '@ant-design/icons';

interface SectionSeparatorProps {
  title: string;
  children?: React.ReactNode;
  status?: boolean;
}

const SectionPrimarySeparator: React.FC<SectionSeparatorProps> = ({ title, children, status }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <>
      <div className="bg-darkModal rounded-md px-4 py-4 my-2 grid grid-cols-12 justify-between items-center">
        <h3 className="pl-8 text-white text-md font-bold col-span-10">{title}</h3>
        <div className="pr-8 col-span-2 flex items-center justify-end gap-x-14">
          <span className={status ? "text-sistemaGreen" : "text-sistemaRed"}>
            {status ? "Ativo" : "Inativo"}
          </span>
          <FaServer color="white" size={20} />
          <button onClick={toggleExpanded} className="focus:outline-none">
            {isExpanded ? <DownOutlined className="text-sistemaBlue" /> : <UpOutlined className="text-sistemaBlue" />}
          </button>
        </div>
      </div>

      <div className={`transition-all duration-300 ease-in-out ${isExpanded ? "" : "hidden"}`}>
        {children}
      </div>

    </>
  );
};

export default React.memo(SectionPrimarySeparator);
