'use client';
import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import LogoIcon from '@/components/MiniComponents/LogoIcon';
import { AppBar, Toolbar, Box, Button } from '@mui/material';

const HeaderPage: NextPage = () => {
  const { logout } = useAuthStore((state) => state);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    setUser(useAuthStore.getState().user);
    const unsub = useAuthStore.subscribe((state) => setUser(state.user));
    return () => unsub();
  }, []);

  return (
    <AppBar position="sticky" sx={{ bgcolor: 'white', boxShadow: 1, zIndex: 50 }}>
      <Toolbar sx={{ maxWidth: '1280px', mx: 'auto', width: '100%' }}>
        <LogoIcon  texto='Loja-vel Tech Solutions'/>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button color="inherit" component={Link} href="/" sx={{ color: 'text.primary' }}>
            Início
          </Button>

          {user ? (
            <Button onClick={logout} color="inherit" sx={{ color: 'text.primary' }}>
              Sair
            </Button>
          ) : (
            <Button component={Link} href="/login" color="inherit" sx={{ color: 'text.primary' }}>
              Login
            </Button>
          )}

          <Button
            component={Link}
            href={user ? '/dashboard' : '/register'}
            variant="contained"
            color="primary"
          >
            {user ? 'Perfil' : 'Cadastre-se'}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default React.memo(HeaderPage);