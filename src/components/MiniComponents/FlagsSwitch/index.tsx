import { Form, Switch } from 'antd';
import React from 'react';

interface FlagSwitchProps {
  name: string;
  label: string;
}

const FlagSwitch: React.FC<FlagSwitchProps> = ({ name, label }) => {
  return (
    <Form.Item
      shouldUpdate={(prev, curr) => prev.flags?.[name] !== curr.flags?.[name]}
      noStyle
    >
      {({ getFieldValue, setFieldsValue }) => {
        const value = getFieldValue(['flags', name]) ?? false;

        const onChange = (checked: boolean) => {
          const currentFlags = getFieldValue('flags') || {};
          setFieldsValue({ flags: { ...currentFlags, [name]: checked } });
        };

        return (
          <div className="flex justify-between items-center w-full py-2">
            <span className="font-bold">{label}:</span>
            <Switch
              checked={value}
              onChange={onChange}
              checkedChildren="Ativo"
              unCheckedChildren="Desativado"
            />
          </div>
        );
      }}
    </Form.Item>
  );
};

export default FlagSwitch;
