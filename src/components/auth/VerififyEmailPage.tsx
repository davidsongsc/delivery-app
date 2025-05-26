'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import {
  TextField, Button, Box, Typography, Alert,
  CircularProgress
} from '@mui/material'

const VerifyEmailPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    verification_code: ''
  })
  const { loading, error } = useAuthStore()
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await useAuthStore.getState().verifyEmail(formData.verification_code);
      router.push('/login');
    } catch (error) {
      console.error('Verification failed:', error);
    }
  };


  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 8,
        p: 4,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: 'background.paper'
      }}
    >
      <Typography variant="h5" component="h1" gutterBottom textAlign="center">
        Verificar E-mail
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        label="Username"
        name="username"
        fullWidth
        margin="normal"
        value={formData.username}
        onChange={handleChange}
        required
      />

      <TextField
        label="Código de Verificação"
        name="verification_code"
        fullWidth
        margin="normal"
        value={formData.verification_code}
        onChange={handleChange}
        required
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Verificar'}
      </Button>

      <Typography variant="body2" textAlign="center">
        Não recebeu o código?{' '}
        <Typography component="span" color="primary" sx={{ cursor: 'pointer' }}>
          Reenviar código
        </Typography>
      </Typography>
    </Box>
  )
}

export default React.memo(VerifyEmailPage);