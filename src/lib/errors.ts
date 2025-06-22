// lib/errors.ts

export type AppErrorCode = 'NOT_FOUND' | 'UNAUTHORIZED' | 'VALIDATION_ERROR' | 'UNKNOWN';

export interface AppError {
  code: AppErrorCode;
  message: string;
  redirectTo?: string;
}

export function parseAppError(error: Error): AppError {
  const message = error.message || '';
  const [code, rawMessage] = message.includes('|') ? message.split('|') : ['UNKNOWN', message];

  const safeCode = code as AppErrorCode;
  const decodedMessage = decodeURIComponent(rawMessage || '');

  switch (safeCode) {
    case 'NOT_FOUND':
      return {
        code: safeCode,
        message: decodedMessage,
        redirectTo: `/nao-encontrado?slug=${decodedMessage}`,
      };

    case 'UNAUTHORIZED':
      return {
        code: safeCode,
        message: decodedMessage || 'Acesso negado',
        redirectTo: `/login?error=${encodeURIComponent(decodedMessage || 'Acesso negado')}`,
      };

    case 'VALIDATION_ERROR':
      return {
        code: safeCode,
        message: decodedMessage || 'Erro de validação',
      };

    default:
      return {
        code: 'UNKNOWN',
        message: 'Erro desconhecido.',
        redirectTo: '/erro?msg=erro-desconhecido',
      };
  }
}
