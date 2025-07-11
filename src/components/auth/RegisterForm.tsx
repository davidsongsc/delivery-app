'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { notification } from 'antd'
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import {
  TextField, Button, Box, Typography, Alert,
  CircularProgress, Grid
} from '@mui/material'
import Image from 'next/image'

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password1: '',
    password2: '',
    phone_number: ''
  })

  const { register, loading, error } = useAuthStore()
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {


    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password1 !== formData.password2) {
      notification.error({
        message: 'Senhas não coincidem',
      })
      return
    }

    try {
      const { username, email, password1, phone_number } = formData
      await register({
        username,
        email,
        password: password1,
        phone_number
      })
      router.push('/dashboard')
    } catch (error: any) {
      console.error('Erro ao registrar usuário:', error)
      notification.warning({
        message: 'Erro ao registrar usuário',
        description: error.error
      })
    }
  }


  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      <div className=' flex items-center justify-center'>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            maxWidth: 600,
            mx: 'auto',
            my: 'auto',
            p: 4,
            boxShadow: 3,
            borderRadius: 2,
            bgcolor: 'background.paper',
          }}
        >
          <Typography variant="h5" component="h1" gutterBottom textAlign="center">
            Registrar
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Username"
                name="username"
                fullWidth
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                name="email"
                fullWidth
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Password"
                type="password"
                name="password1"
                fullWidth
                value={formData.password1}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Confirm Password"
                type="password"
                name="password2"
                fullWidth
                value={formData.password2}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone Number"
                name="phone_number"
                fullWidth
                value={formData.phone_number}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Registrar'}
          </Button>

          <Typography variant="body2" textAlign="center">
            Já tem uma conta?{' '}
            <Link component={NextLink} href="/login" underline="none">
              Faça login
            </Link>
          </Typography>
        </Box>
      </div>
      <div
        className="hidden lg:flex justify-center items-center "
      >
        <Image
          src="/files/login/register.svg"
          alt="Registro"
          width={650}
          height={500}
          style={{ maxWidth: '90%', height: 'auto' }}
        />
      </div>
    </div>

  )
}

export default RegisterForm