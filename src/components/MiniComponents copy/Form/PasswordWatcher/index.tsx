import { useWatch } from "antd/es/form/Form";
import PasswordFeedback from "../PasswordInput";

export const PasswordWatcher = ({ form }: { form: any }) => {
  const senha = useWatch("senha", form);
  return <PasswordFeedback password={senha || ""} />;
};
