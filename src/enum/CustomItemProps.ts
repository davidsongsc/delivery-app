import { FormItemProps } from "antd";

export interface CustomItemProps extends FormItemProps {
  label: string;
  isBold?: boolean;
  message: string;
  required?: boolean;
  name: string;
  children?: React.ReactNode;
}
