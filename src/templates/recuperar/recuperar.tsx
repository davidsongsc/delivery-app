'use client'

import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  CircularProgress
} from '@mui/material'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const RecuperarContaPage = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  /**
   * Função para tratar o formulário de recuperação de senha.
   * @param {React.FormEvent} e - Evento do formulário.
   * @returns {Promise<void>}
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess('')
    setError('')

    try {
      // Aqui você chama sua API de recuperação
      await new Promise((res) => setTimeout(res, 1500)) // simulação

      setSuccess('Se encontrarmos esse e-mail, enviaremos as instruções para redefinir a senha.')
    } catch (err) {
      setError('Ocorreu um erro. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 500,
          mx: 'auto',
          my: 'auto',
          p: 4,
          borderRadius: 3,
          boxShadow: 3,
          bgcolor: 'background.paper'
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom textAlign="center">
          Recuperar Conta
        </Typography>

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          label="Digite seu e-mail"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          margin="normal"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2, mb: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Enviar instruções'}
        </Button>

        <Typography variant="body2" textAlign="center">
          Lembrou da senha?{' '}
          <Link href="/login" style={{ color: '#1976d2', textDecoration: 'none' }}>
            Fazer login
          </Link>
        </Typography>
      </Box>

      <div
        className="hidden lg:flex justify-center items-center "
      >
        <Image
          src="/files/login/recovery.svg"
          alt="Recuperar senha"
          width={600}
          height={500}
          style={{ maxWidth: '90%', height: 'auto' }}
        />
      </div>
    </div>
  )
}

export default RecuperarContaPage
