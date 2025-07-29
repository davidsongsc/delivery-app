"use client";

import React, { useMemo } from "react";
import { Form } from "antd";
import useIsTablet from "@/hooks/useIsTablet";
import { CustomFormProps } from "@/enum/SupportFormEnums";

const CustomForm: React.FC<CustomFormProps> = ({
  className = "",
  children,
  ...props
}) => {
  const isTablet = useIsTablet();

  const computedClass = useMemo(() => {
    const base =
      "[&_.ant-input]:!text-site-text_light [&_.ant-select-selector]:text-left " +
      "[&_.ant-form-item-additional]:text-left [&_.ant-form-item-required:after]:hidden [&_.ant-form-item-required:before]:!hidden " +
      "[&_.ant-form-item-required]:w-full [&_.ant-form-item-required]:rounded-md [&_.ant-form-item-required]:bg-white " +
      "[&_.ant-form-item-required]:px-3 [&_.ant-form-item]:mb-3 [&_.ant-input]:rounded-md " +
      "[&_.ant-input]:!bg-site-bg_default [&_.ant-input]:placeholder:text-site-text_light " +
      "[&_.ant-select-selection-placeholder]:text-site-text_light [&_.ant-select-selector]:rounded-md " +
      " [&_.ant-select-selector]:!bg-site-bg_default " +
      "[&_.ant-select-selector]:!text-site-text_light " +
      "[&_.ant-input-outlined]:bg-transparent [&_.ant-input-outlined]:rounded-md " +
      "[&_.ant-input-status-error]:!bg-transparent " +
      "[&_.ant-input-password-icon]:!text-site-primary_dark [&_.ant-input-password-icon]:mr-2";

    const heightStyle = isTablet
      ? "[&_.ant-form-item-required]:!h-[32px] [&_.ant-input]:text-siteSm [&_.ant-select-selector]:!h-[32px] [&_.ant-select-selector]:!text-siteSm"
      : "[&_.ant-form-item-required]:!h-[38px] [&_.ant-input]:text-siteBase [&_.ant-select-selector]:!h-[38px] [&_.ant-select-selector]:!text-siteBase";

    return `${base} ${heightStyle} ${className}`;
  }, [isTablet, className]);

  return (
    <Form {...props} className={computedClass}>
      {children}
    </Form>
  );
};

export default React.memo(CustomForm);
