"use client";

import React, { useMemo } from "react";
import { Form } from "antd";
import useIsMobile from "@/hooks/useIsMobile";
import { CustomItemProps } from "@/enum/CustomItemProps";

const CustomItem: React.FC<CustomItemProps> = ({
  label,
  isBold = false,
  message,
  required = true,
  name,
  children,
  ...props
}) => {
  const isMobile = useIsMobile();

  const renderedLabel = useMemo(() => {
    if (isMobile) return null;
    return (
      <span
        className={`${
          isBold ? "font-bold" : ""
        } text-site-primary_dark siteSm:text-siteSm siteLg:text-siteBase`}
      >
        {label}
      </span>
    );
  }, [isMobile, label, isBold]);

  const rules = useMemo(() => [{ required, message }], [required, message]);

  return (
    <Form.Item label={renderedLabel} name={name} rules={rules} {...props}>
      {children}
    </Form.Item>
  );
};

export default React.memo(CustomItem);
