'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuthStore } from '@/store/authStore'
import { Box, Typography, CircularProgress, Alert, Button } from '@mui/material'
import Head from 'next/head'

const VerifyEmailPage = () => {
  const router = useRouter()
  const { token } = router.query
  const { verifyEmail, loading, error } = useAuthStore()
  const [verified, setVerified] = useState(false)

  useEffect(() => {
    if (token && typeof token === 'string') {
      verifyEmail(token)
        .then(() => setVerified(true))
        .catch(() => setVerified(false));
    }
  }, [token, verifyEmail]);


  return (
    <>
      <Head>
        <title>Verificar Email | Sistema</title>
      </Head>
      <Box
        sx={{
          maxWidth: 600,
          mx: 'auto',
          mt: 8,
          p: 4,
          textAlign: 'center'
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <>
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
            <Button variant="contained" onClick={() => router.push('/')}>
              Voltar para a página inicial
            </Button>
          </>
        ) : verified ? (
          <>
            <Typography variant="h5" gutterBottom>
              Email verificado com sucesso!
            </Typography>
            <Button
              variant="contained"
              onClick={() => router.push('/login')}
              sx={{ mt: 2 }}
            >
              Fazer login
            </Button>
          </>
        ) : (
          <Typography variant="h5" gutterBottom>
            Verificando seu email...
          </Typography>
        )}
      </Box>
    </>
  )
}

export default VerifyEmailPage