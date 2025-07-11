
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
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import styles from './styles.module.css'
import ClientOnly from '@/components/ClientOnly';

import useParallaxEffect from '@/hooks/useParallaxEffect';
import { notification } from 'antd';
import TestimonialsSection from '@/components/MiniComponents/Section/Testimonials';
const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading, error } = useAuthStore();
    const router = useRouter();
    const isUser = useAuthStore(state => state.user);
    const starsLayer1Ref = useParallaxEffect(30);
    const starsLayer2Ref = useParallaxEffect(50);
    const starsLayer3Ref = useParallaxEffect(80);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(username, password);
            router.push('/dashboard');
        } catch (error) {
            notification.error({
                message: 'Erro ao fazer login',
                description: 'Verifique suas credenciais e tente novamente.',
            });
        }
    }, [login, username, password, router]);

    const generateStars = useCallback((numStars: number, minSize: number, maxSize: number, opacity: number) => {
        const stars = [];
        for (let i = 0; i < numStars; i++) {
            const size = Math.random() * (maxSize - minSize) + minSize;
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            const duration = Math.random() * 5 + 5;

            stars.push(
                <span
                    key={i}
                    style={{
                        position: 'absolute',
                        top: `${top}%`,
                        left: `${left}%`,
                        width: `${size}px`,
                        height: `${size}px`,
                        backgroundColor: `rgba(255, 255, 255, ${opacity})`,
                        borderRadius: '50%',
                        boxShadow: `0 0 ${size * 0.5}px ${size * 0.2}px rgba(255, 255, 255, 0.7)`,
                        animation: `twinkle ${duration}s infinite alternate ease-in-out`,
                    }}
                ></span>
            );
        }
        return stars;
    }, []);
    return (
        <>
            {/* CONTAINER FIXO DO FUNDO ESTELAR */}
            <ClientOnly>
                <Box
                    sx={{
                        minHeight: '100vh',
                        width: '100vw',
                        background: 'linear-gradient(180deg, #020024 0%, #090979 35%, #00d4ff 100%)', // <--- AQUI!
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        overflow: 'hidden',
                        zIndex: -1,
                    }}
                >
                    {/* Camadas de Parallax */}
                    <div ref={starsLayer1Ref} style={{ position: 'absolute', width: '110%', height: '110%' }}>
                        {generateStars(100, 1.5, 3, 0.9)}
                    </div>
                    <div ref={starsLayer2Ref} style={{ position: 'absolute', width: '120%', height: '120%' }}>
                        {generateStars(150, 1, 2, 0.7)}
                    </div>
                    <div ref={starsLayer3Ref} style={{ position: 'absolute', width: '130%', height: '130%' }}>
                        {generateStars(200, 0.5, 1.5, 0.5)}
                    </div>
                </Box>
            </ClientOnly>

            <div
                className='grid grid-cols-1 md:grid-cols-2'
                style={{
                    minHeight: '100vh',
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                {/* Coluna do Formulário de Login */}
                <Box
                    sx={{
                        minHeight: '93vh',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        p: 2,
                    }}

                >
                    {isUser ? <TestimonialsSection /> : <Paper
                        elevation={6}
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            width: '100%',
                            maxWidth: 600,
                            p: 4,
                            borderRadius: 2,
                            bgcolor: 'background.paper',
                            boxShadow: 10,
                            zIndex: 10,
                            position: 'relative',
                        }}
                        style={{ border: error ? '1px solid red' : '' }}

                    >
                        <Typography variant="h4" textAlign="center" mb={3} fontWeight="bold" color="primary">
                            Login de Usuário
                        </Typography>

                        <div>
                            {error && (
                                <Alert severity="error" sx={{ mb: 2 }}>
                                    {error}
                                </Alert>
                            )}
                        </div>

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


                        <div className='grid grid-cols-2'>
                            <div>
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
                            </div>
                            <div>

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
                            </div>
                        </div>

                    </Paper>}

                </Box>

                <div className='hidden md:flex justify-center align-center w-full h-full flex-col'>


                    <Image src="/files/login/login-animate.svg" alt="Login" width={950} height={600} />
                </div>

            </div>

        </>
    );
};

export default React.memo(LoginPage);