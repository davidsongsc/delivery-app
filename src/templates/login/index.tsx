import { TextField, Button, Box, Typography, Alert, CircularProgress } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import React, { useState } from 'react';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading, error } = useAuthStore();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(username, password);
            router.push('/');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };
    return <div >

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
            suppressHydrationWarning // Ignora avisos de hidratação
        >
            <Typography variant="h5" component="h1" gutterBottom textAlign="center">
                Login
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <TextField
                label="Username"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />

            <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}

            >
                {loading ? <CircularProgress size={24} /> : 'Login'}
            </Button>

            <Typography variant="body2" textAlign="center">
                Não tem uma conta?{' '}
                <Link href="/register" style={{ color: '#1976d2', textDecoration: 'none' }}>
                    Registre-se
                </Link>
            </Typography>
        </Box>
    </div>;
}