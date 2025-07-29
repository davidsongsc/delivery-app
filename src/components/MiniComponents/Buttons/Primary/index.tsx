"use client";

import { CustomButtonProps } from "@/enum/ButtonProps";
import { Button } from "antd";
import React from "react";

const PrimaryButton: React.FC<CustomButtonProps> = ({
  href,
  label,
  className,
  ...props
}) => {
  return (
    <Button
      href={href ?? undefined}
      type="primary"
      className={`h-[30px] w-full rounded-[15px] bg-site-primary font-sans text-siteSm font-normal text-white hover:!border-site-primary hover:!bg-transparent hover:!text-site-primary siteMd:w-[95px] ${className}`}
      {...props}
    >
      {label}
    </Button>
  );
};

export default React.memo(PrimaryButton);
