import { ButtonProps } from "antd";

export interface CustomButtonProps extends ButtonProps {
  href?: string | undefined;
  label: string;
  className?: string;
}
