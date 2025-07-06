'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Spin, Result, Button } from 'antd'
import { authService } from '@/services/authService'

function AtivarContaComponent() {
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
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Result
        status={status}
        title={status === 'success' ? 'Conta ativada com sucesso!' : 'Erro ao ativar conta'}
        subTitle={message}
        extra={
          <Button type="primary" onClick={() => router.push('/login')}>
            Ir para login
          </Button>
        }
      />
    </div>
  )
}

export default function AtivarContaPage() {
  return (
    <Suspense fallback={<Spin size="large" style={{ marginTop: 200 }} />}>
      <AtivarContaComponent />
    </Suspense>
  )
}
