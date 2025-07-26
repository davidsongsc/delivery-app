'use client';
import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import LogoIcon from '@/components/MiniComponents/LogoIcon';
import { AppBar, Toolbar, Box, Button } from '@mui/material';
import { Menu } from 'antd';

const HeaderPage: NextPage = () => {
    const { logout } = useAuthStore((state) => state);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();
    console.log(user);
    useEffect(() => {
        setUser(useAuthStore.getState().user);
        const unsub = useAuthStore.subscribe((state) => setUser(state.user));
        return () => unsub();
    }, []);

    return (
        <>
            <header>
                <AppBar position="sticky" sx={{ bgcolor: 'white', boxShadow: 1, zIndex: 50 }}>
                    <Toolbar sx={{ maxWidth: '1280px', mx: 'auto', width: '100%' }}>
                        <LogoIcon texto='Loja-vel Tech Solutions' />
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Button color="inherit" component={Link} href="/" sx={{ color: 'text.primary' }}>
                                Início
                            </Button>

                            {user ? (
                                <>
                                    {/* Novos botões para usuários autenticados */}
                                    <Button component={Link} href="/consulta-financeira" color="inherit" sx={{ color: 'text.primary' }}>
                                        Nova simulação
                                    </Button>
                                    <Button component={Link} href="/consultar-score" color="inherit" sx={{ color: 'text.primary' }}>
                                        Consultar Score
                                    </Button>
                                    <Button component={Link} href="/buscar-parceiros" color="inherit" sx={{ color: 'text.primary' }}>
                                        Buscar Parceiros
                                    </Button>

                                    <Button onClick={logout} color="inherit" sx={{ color: 'text.primary' }}>
                                        Sair
                                    </Button>
                                    <Button
                                        component={Link}
                                        href="/dashboard"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Perfil
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button component={Link} href="/login" color="inherit" sx={{ color: 'text.primary' }}>
                                        Login
                                    </Button>
                                    <Button
                                        component={Link}
                                        href="/register"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Cadastre-se
                                    </Button>
                                </>
                            )}

                        </Box>

                    </Toolbar>

                </AppBar>



            </header>
            {
                user ?
                    <nav className='grid grid-cols-1 position-sticky top-0 z-50' >
                        <Menu
                            mode="horizontal"
                            onClick={({ key }) => router.push(key)}
                            className="text-black bg-white shadow-md px-4 md:px-20 xl:px-40 2xl:px-60"
                            items={[
                                {
                                    key: 'sistema',
                                    label: 'Sistema',
                                    children: [
                                        {
                                            key: '/dashboard/configuracoes/usuarios',
                                            label: 'Configurações',
                                        },
                                        {
                                            key: '/dashboard/configuracoes/permissoes',
                                            label: 'Permissões',
                                        },
                                    ],
                                },
                                {
                                    key: 'corporacoes',
                                    label: 'Corporações',
                                    children: [
                                        {
                                            key: '/dashboard/configuracoes/usuarios',
                                            label: 'Usuários',
                                        },
                                        {
                                            key: '/dashboard/configuracoes/permissoes',
                                            label: 'Permissões',
                                        },
                                    ],
                                },
                            ]}
                        />

                    </nav> : null
            }
        </>
    );
};

export default React.memo(HeaderPage);