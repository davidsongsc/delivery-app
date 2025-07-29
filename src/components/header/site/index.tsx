'use client';
import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import LogoIcon from '@/components/MiniComponents/LogoIcon';
import { AppBar, Toolbar, Box, Button } from '@mui/material';
import { Menu } from 'antd';
import { IUser } from '@/interfaces/IUser';
import getUserPermissions from '@/utils/permissions';
import { useAuth } from '@/contexts/AuthContext';

const HeaderPage: NextPage = () => {
    const { logout } = useAuthStore((state) => state);
    const hydrated = useAuthStore((state) => state.hydrated);
    const { user, isAuthenticated, loading, checkAuth } = useAuth();
    const permissions = getUserPermissions(user);
    console.log('User Permissions:', permissions);
    const menuItems = [
        {
            key: 'sistema',
            label: 'Sistema',
            children: [
                permissions.includes('sistema_configuracoes') && {
                    key: '/dashboard/configuracoes/sistema',
                    label: 'Configurações',
                },
                permissions.includes('sistema_empresas') && {
                    key: '/dashboard/configuracoes/empresas',
                    label: 'Empresas',
                },
            ].filter(Boolean), // remove falsos (null/false/undefined)
        },
        {
            key: 'usuarios',
            label: 'Usuarios',
            children: [
                permissions.includes('usuarios_listar') && {
                    key: '/dashboard/configuracoes/usuarios',
                    label: 'Usuarios',
                },
                permissions.includes('usuarios_permissoes') && {
                    key: '/dashboard/configuracoes/permissoes',
                    label: 'Permissões',
                },

            ].filter(Boolean), // remove falsos (null/false/undefined)
        },

    ].filter(item => item.children?.length); // remove se não tiver filhos visíveis

    const router = useRouter();


    if (!hydrated) return null;

    return (
        <>
            <AppBar sx={{ bgcolor: 'white', boxShadow: 1, zIndex: 50 }} position="static">
                <Toolbar sx={{ maxWidth: '1280px', mx: 'auto', width: '100%' }}>
                    <LogoIcon texto='Loja-vel Tech Solutions' />
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Button color="inherit" component={Link} href="/" sx={{ color: 'text.primary' }}>
                            Início
                        </Button>

                        {user ? (
                            <>
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

            {user && (
                <nav className='grid grid-cols-1 sticky top-0 z-40'>
                    <Menu
                        mode="horizontal"
                        onClick={({ key }) => router.push(key)}
                        className="text-black bg-white shadow-md px-4 md:px-20 xl:px-40 2xl:px-60"
                        items={menuItems}
                    />
                </nav>
            )}
        </>

    );
};

export default React.memo(HeaderPage);