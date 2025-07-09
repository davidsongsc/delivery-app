'use client'
import {
    TextField,
    Button,
    Box,
    Typography,
    Alert,
    CircularProgress,
    Paper
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import React, { useState } from 'react';
import Image from 'next/image';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading, error } = useAuthStore();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(username, password);
            router.push('/dashboard');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className='grid grid-cols-1 md:grid-cols-2'>
            <Box
                sx={{
                    minHeight: '93vh',
                    background: 'linear-gradient(175deg, #FFFFFF,#142579)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 2,
                }}
            >
                <Paper
                    elevation={6}
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        width: '100%',
                        maxWidth: 400,
                        p: 4,
                        borderRadius: 3,
                        bgcolor: 'background.paper',
                        boxShadow: 4,
                    }}
                >
                    <Typography variant="h4" textAlign="center" mb={3} fontWeight="bold" color="primary">
                        Bem-vindo
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <TextField
                        label="Usuário"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <TextField
                        label="Senha"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3,
                            mb: 2,
                            height: 45,
                            transition: '0.3s ease',
                            ':hover': { transform: 'scale(1.02)' },
                        }}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Entrar'}
                    </Button>

                    <Typography variant="body2" textAlign="center" mt={2}>
                        Não tem uma conta?{' '}
                        <Link href="/register" style={{ color: '#1976d2', textDecoration: 'none' }}>
                            Registre-se
                        </Link>
                    </Typography>

                    <Typography variant="body2" textAlign="center" mt={1}>
                        Esqueceu a senha?{' '}
                        <Link href="/recuperar" style={{ color: '#1976d2', textDecoration: 'none' }}>
                            Recuperar conta
                        </Link>
                    </Typography>
                </Paper>
            </Box>

            <div className='hidden md:flex justify-center align-center w-full h-full '
                >
                <Image src="/files/login/login-animate.svg" alt="Login" width={950} height={600} />
            </div>
        </div>
    );
};

export default React.memo(LoginPage);
