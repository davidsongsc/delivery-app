"use client";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import React, { useCallback, useMemo } from "react";
import { DEFAULT_PHONE_VALUE, PhoneFieldProps } from "@/enum/PhoneFieldEnums";

const PhoneField: React.FC<PhoneFieldProps> = (
  props,
  { value = DEFAULT_PHONE_VALUE, onChange }
) => {
  const phoneValue = useMemo(() => value || DEFAULT_PHONE_VALUE, [value]);

  const handleChange = useCallback(
    (val: string) => {
      if (!val.startsWith("55")) {
        onChange?.("55");
      } else {
        onChange?.(val);
      }
    },
    [onChange]
  );

  return (
    <PhoneInput
      country="br"
      value={phoneValue}
      onChange={handleChange}
      disableCountryCode={false}
      countryCodeEditable={false}
      inputClass="!w-full !h-[32px] siteLg:!h-[38px] !pl-[60px] !text-site-text_light !bg-site-bg_default  !rounded-md !border-none placeholder:text-site-text_light !text-siteSm siteLg:!text-siteBase"
      buttonClass="!bg-white !border-none !shadow-none !outline-none"
      containerClass="!w-full"
      dropdownClass="!bg-site-bg_light !border !border-site-gray !rounded-lg !shadow-md !p-0 !z-[90] text-left scrollbar-thin scrollbar-track-site-sky_blue scrollbar-thumb-site-primary [&_.country]:!text-site-text [&_.country]:!py-[10px] [&_.country]:!px-[12px] [&_.country]:!text-sm [&_.country:hover]:!bg-site-sky_blue [&_.country:hover]:!text-site-primary [&_.country:hover]:!font-semibold [&_.country.highlight]:!bg-site-primary [&_.country.highlight]:!text-site-snow_blue [&_.country.highlight]:!font-bold"
      {...props}
    />
  );
};

export default React.memo(PhoneField);
