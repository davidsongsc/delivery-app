'use client';

import React, { useState, useCallback, RefObject } from 'react';
import { Input, Button, Typography, Alert, Spin, Checkbox, Card } from 'antd/es';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';
import type { InputRef } from 'antd/es/input';

type LoginFormProps = {
  onSuccess: () => void;
  emailRef?: RefObject<InputRef | null>;
  passwordRef?: RefObject<InputRef | null>;
};

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, emailRef, passwordRef }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ username?: boolean; password?: boolean }>({});
  const [errorMessage, setErrorMessage] = useState<{ title?: string; detail?: string }>({});

  const { login, loading } = useAuthStore();

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
    <Card

    >
 
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          ref={emailRef}
          placeholder="Usuário"
          size="large"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoComplete="username"
          status={fieldErrors.username ? 'error' : ''}
          className="rounded-lg border-gray-300 focus:border-red-600 focus:ring-1 focus:ring-red-600"
        />
        {fieldErrors.username && (
          <Typography.Text type="danger" className="text-sm block">
            Usuário inválido
          </Typography.Text>
        )}

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
          className="rounded-lg border-gray-300 focus:border-red-600 focus:ring-1 focus:ring-red-600"
        />
        {fieldErrors.password && (
          <Typography.Text type="danger" className="text-sm block">
            Senha inválida
          </Typography.Text>
        )}

        <Checkbox
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="text-gray-700"
        >
          Lembrar-me
        </Checkbox>

        <Button
          type="primary"
          htmlType="submit"
          size="large"
          block
          className="bg-red-600 hover:bg-red-700 text-white rounded-xl h-12 flex items-center justify-center gap-2"
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
            className="mt-2"
          />
        )}

        <div className="text-center mt-4 space-y-1">
          <Typography.Text className="block text-sm">
            Não tem uma conta?{' '}
            <Link href="/register" className="text-yellow-500 hover:underline">
              Registre-se
            </Link>
          </Typography.Text>
          <Typography.Text className="block text-sm">
            Esqueceu a senha?{' '}
            <Link href="/recuperar" className="text-yellow-500 hover:underline">
              Recuperar conta
            </Link>
          </Typography.Text>
        </div>
      </form>
    </Card>
  );
};

export default React.memo(LoginForm);
