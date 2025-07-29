"use client";

import { CustomButtonProps } from "@/enum/ButtonProps";
import { Button } from "antd";
import React from "react";

const OutlineButton: React.FC<CustomButtonProps> = ({
  href,
  label,
  className,
  ...props
}) => {
  return (
    <Button
      href={href ?? undefined}
      type="default"
      className={`h-[30px] w-full rounded-[15px] border-site-primary bg-transparent font-sans text-siteSm font-normal text-site-primary hover:!bg-site-primary hover:!text-white siteMd:w-[95px] ${className}`}
      {...props}
    >
      {label}
    </Button>
  );
};

export default React.memo(OutlineButton);
