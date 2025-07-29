export interface PasswordFeedbackProps {
  password: string;
}

export enum PasswordCriterion {
  LENGTH = "Mínimo 8 caracteres",
  UPPERCASE = "Letra maiúscula",
  NUMBER = "Número",
  SPECIAL = "Caractere especial",
}

export enum ProgressStatus {
  Normal = "normal",
  Exception = "exception",
  Success = "success",
}
