import { Form, Segmented } from 'antd';
import React from 'react';
import './styles.css';
interface FlagSwitchProps {
  name: string[];
  label: string;
}

const FlagSwitch: React.FC<FlagSwitchProps> = ({ name, label }) => (
  <Form.Item
    label={<span className="font-bold text-xl">{label}</span>}
    name={name}
    className="col-span-6 px-2"
  >
    <Segmented
      block
      options={[
        { label: 'Ativo', value: true },
        { label: 'Desativado', value: false }
      ]}
    />
  </Form.Item>
);

export default FlagSwitch;
