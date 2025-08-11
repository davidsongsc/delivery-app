import React, { useState, useCallback, RefObject, useRef } from 'react';
import { Input, Button, Typography, Alert, Spin, Checkbox, Card } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';
import type { InputRef } from 'antd';

type LoginFormProps = {
  onSuccess: () => void;
  emailRef?: RefObject<InputRef | null>;
  passwordRef?: RefObject<InputRef | null>;
};

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, emailRef, passwordRef }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ username?: boolean; password?: boolean }>({});
  const [errorMessage, setErrorMessage] = useState<{ title?: string; detail?: string }>({});

  const { login, loading } = useAuthStore();
  const router = useRouter();

  const toggleShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setFieldErrors({ username: false, password: false });
      setErrorMessage({});

      try {
        await login(username, password);
        const { isAuthenticated } = useAuthStore.getState();

        if (isAuthenticated) {
          onSuccess?.();
        }
      } catch (error: any) {
        const title = error.title || 'Erro de Login';
        const detail = error.detail || 'Não foi possível fazer o login. Verifique suas credenciais.';
        setErrorMessage({ title, detail });
        setFieldErrors({ username: true, password: true });
      }
    },
    [login, username, password, onSuccess]
  );

  return (
    <Card className="w-full max-w-2xl shadow-xl rounded-lg bg-white relative" style={{ left: '-00px' }}>
      <Typography.Title level={3} className="text-center font-bold text-blue-600">
        Login de Usuário
      </Typography.Title>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Input
            ref={emailRef}
            placeholder="Usuário"
            size="large"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
            status={fieldErrors.username ? 'error' : ''}
          />
          {fieldErrors.username && (
            <Typography.Text type="danger" className="text-sm mt-1 block">
              Usuário inválido
            </Typography.Text>
          )}
        </div>

        <div className="mb-4">
          <Input.Password
            ref={passwordRef}
            placeholder="Senha"
            size="large"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
            status={fieldErrors.password ? 'error' : ''}
          />
          {fieldErrors.password && (
            <Typography.Text type="danger" className="text-sm mt-1 block">
              Senha inválida
            </Typography.Text>
          )}
        </div>

        <div className="mb-4">
          <Checkbox
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          >
            Lembrar-me
          </Checkbox>
        </div>

        <Button
          type="primary"
          htmlType="submit"
          size="large"
          block
          className="mt-3 mb-2 h-11 transition-all duration-300 hover:scale-102"
          loading={loading}
          disabled={loading}
        >
          {loading ? <Spin size="small" /> : 'Entrar'}
        </Button>

        {errorMessage.detail && (
          <Alert
            message={errorMessage.title}
            description={errorMessage.detail}
            type="error"
            showIcon
            className="mb-4"
          />
        )}

        <Typography.Text className="block text-center mt-4 text-sm">
          Não tem uma conta?{' '}
          <Link href="/register" className="text-blue-600 hover:underline">
            Registre-se
          </Link>
        </Typography.Text>

        <Typography.Text className="block text-center mt-2 text-sm">
          Esqueceu a senha?{' '}
          <Link href="/recuperar" className="text-blue-600 hover:underline">
            Recuperar conta
          </Link>
        </Typography.Text>
      </form>
    </Card>
  );
};

export default React.memo(LoginForm);
