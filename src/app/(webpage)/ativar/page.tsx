'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Spin, Result, Button, Typography } from 'antd'
import { authService } from '@/services/authService'

export default function AtivarContaPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const router = useRouter()

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    if (!token) {
      setStatus('error')
      setMessage('Token não encontrado na URL.')
      return
    }

    const activate = async () => {
      try {
        const data = await authService.activateAccount(token)
        setStatus('success')
        setMessage(data.message)
      } catch (error: any) {
        setStatus('error')
        setMessage(error?.response?.data?.error || 'Erro ao ativar conta.')
      }
    }

    activate()
  }, [token])

  if (status === 'loading') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 100 }}>
        <Spin size="large" />
      </div>
    )
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen px-4">
      <Result
        status={status}
        title={status === 'success' ? 'Conta ativada com sucesso!' : 'Erro ao ativar conta'}
        subTitle={message}
        extra={
          <>
            <Button type="primary" onClick={() => router.push('/login')}>
              Ir para login
            </Button>

            {status === 'error' && (
              <>
                <Button
                  onClick={() => router.push('/reenviar-email-ativacao')}
                  style={{ marginLeft: 8 }}
                >
                  Reenviar e-mail de ativação
                </Button>

                <Typography.Paragraph style={{ marginTop: 16, maxWidth: 400, textAlign: 'center' }}>
                  <strong>Dicas para ativar sua conta:</strong>
                  <ul style={{ textAlign: 'left', marginTop: 8 }}>
                    <li>Verifique se o link no e-mail está completo e correto.</li>
                    <li>Cheque sua caixa de spam ou lixo eletrônico.</li>
                    <li>Solicite um novo e-mail de ativação se necessário.</li>
                    <li>Se o problema persistir, entre em contato com o suporte.</li>
                  </ul>
                </Typography.Paragraph>
              </>
            )}
          </>
        }
      />
    </div>
  )
}
