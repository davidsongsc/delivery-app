import React, { useState, useCallback } from 'react';
import {
    TextField,
    Button,
    Box,
    Typography,
    Alert,
    CircularProgress,
    Paper,
    Checkbox,
    FormControlLabel,
    IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { notification } from 'antd';
import Image from 'next/image';
import TestimonialsSection from '@/components/MiniComponents/Section/Testimonials';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<{ username?: boolean; password?: boolean }>({});
    const [errorMessage, setErrorMessage] = useState<{ title?: string; detail?: string }>({});

    const { login, loading } = useAuthStore();
    const router = useRouter();
    const isUser = useAuthStore(state => state.user);

    const toggleShowPassword = () => setShowPassword(show => !show);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();

        // Reset erros anteriores
        setFieldErrors({});
        setErrorMessage({});

        try {
            await login(username, password, rememberMe);

            const isAuthenticated = useAuthStore.getState().isAuthenticated;

            if (isAuthenticated) {
                router.push('/dashboard');
            }
        } catch (error: any) {
            // Supondo que error tenha a estrutura { title, detail }
            const title = error.title || 'Erro ao fazer login';
            const detail = error.detail || 'Tente novamente mais tarde';

            setErrorMessage({ title, detail });

            notification.warning({
                message: title,
                description: detail,
            });

            // Marcar campos inválidos se aplicável
            // Se seu backend retorna info de quais campos erraram, adapte aqui
            // Exemplo simples que marca ambos como erro:
            setFieldErrors({ username: true, password: true });
        }
    }, [login, username, password, rememberMe, router]);

    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-2' style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>
                <Box
                    sx={{
                        minHeight: '93vh',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        p: 2,
                    }}
                >
                    {isUser ? (
                        <TestimonialsSection />
                    ) : (
                        <Paper
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
                        >
                            <Typography variant="h4" textAlign="center" mb={3} fontWeight="bold" color="primary">
                                Login de Usuário
                            </Typography>

                            <TextField
                                label="Usuário"
                                fullWidth
                                margin="normal"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                autoComplete="username"
                                error={!!fieldErrors.username}
                                helperText={fieldErrors.username ? 'Usuário inválido' : ''}
                            />

                            <TextField
                                label="Senha"
                                type={showPassword ? 'text' : 'password'}
                                fullWidth
                                margin="normal"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                                InputProps={{
                                    endAdornment: (
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={toggleShowPassword}
                                            edge="end"
                                            size="small"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    ),
                                }}
                                error={!!fieldErrors.password}
                                helperText={fieldErrors.password ? 'Senha inválida' : ''}
                            />

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        color="primary"
                                    />
                                }
                                label="Lembrar-me"
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

                            {errorMessage.detail && (
                                <Alert severity="error" sx={{ mb: 2 }}>
                                    {errorMessage.title}: {errorMessage.detail}
                                </Alert>
                            )}

                            <div className="grid grid-cols-2">
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
                            </div>
                        </Paper>
                    )}
                </Box>

                <div className="hidden md:flex justify-center align-center w-full h-full flex-col">
                    <Image src="/files/login/login-animate.svg" alt="Login" width={950} height={600} />
                </div>
            </div>
        </>
    );
};

export default React.memo(LoginPage);
