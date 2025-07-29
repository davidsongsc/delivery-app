import { FormProps } from "antd";
import { ReactNode } from "react";

export interface CustomFormProps extends FormProps {
  children: ReactNode;
}

export const reasonOptions = [
  { label: "Suporte técnico", value: "suporte" },
  { label: "Financeiro", value: "financeiro" },
  { label: "Outro", value: "outro" },
];

export const notificationConfig = {
  message: "Mensagem enviada com sucesso",
  description: "Nossa equipe entrará em contato em breve.",
};
