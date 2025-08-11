import { Form, Switch } from 'antd';

interface FlagSwitchProps {
  name: string;
  label: string;
}

const FlagSwitch: React.FC<FlagSwitchProps> = ({ name, label }) => (
  <Form.Item name={['flags', name]} valuePropName="checked" style={{ marginBottom: 8 }}>
    <div className="flex justify-between items-center">
      <span className="font-bold">{label}:</span>
      <Switch checkedChildren="Ativo" unCheckedChildren="Desativado" />
    </div>
  </Form.Item>
);

export default FlagSwitch;
