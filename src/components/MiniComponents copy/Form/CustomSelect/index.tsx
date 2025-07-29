"use client";

import React from "react";
import { Select, SelectProps } from "antd";

const CustomSelect: React.FC<SelectProps> = props => {
  return (
    <Select
      popupClassName="!bg-site-bg_light !shadow-md !rounded-lg !border-none [&_.ant-select-item-option-content]:!text-site-text [&_.ant-select-item-option-active]:!bg-site-sky_blue [&_.ant-select-item-option-active]:!font-bold [&_.ant-select-item-option-active_.ant-select-item-option-content]:!text-site-primary [&_.ant-select-item-option-selected]:!bg-site-primary [&_.ant-select-item-option-selected_.ant-select-item-option-content]:!text-site-snow_blue"
      {...props}
    />
  );
};

export default React.memo(CustomSelect);
