// components/Header.tsx
'use client'
import React from 'react'
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Button,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    useTheme,
} from '@mui/material'
import Link from 'next/link'
import useMediaQuery from '@/hooks/useMediaQuery'
import { MenuIcon } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import LogoIcon from '@/components/MiniComponents/LogoIcon'

export default function HeaderFinanceira() {
    const [mobileOpen, setMobileOpen] = React.useState(false)
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const { user } = useAuthStore((state) => state)
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    const navLinks = [
        { label: 'Simulador', href: '/simulador' },
        { label: 'Sobre', href: '/sobre' },
        { label: 'Contato', href: '/contato' },
    ]

    const drawer = (
        <Box sx={{ width: 250 }} onClick={handleDrawerToggle}>
            <List>
                {navLinks.map(({ label, href }) => (
                    <ListItemButton key={label} component={Link} href={href}>
                        <ListItemText primary={label} />
                    </ListItemButton>
                ))}
            </List>
        </Box>
    )

    return (
        <>
            <AppBar position="relative" color="primary" elevation={3}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    {/* Logo ou título */}
                    <Box display="flex" alignItems="center">
                        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Typography variant="h6" fontWeight="bold">
                                <LogoIcon />
                            </Typography>
                        </Link>
                    </Box>

                    {/* Navegação normal (desktop) */}
                    {!isMobile && (
                        <Box display="flex" gap={2}>
                            {navLinks.map(({ label, href }) => (
                                <Button
                                    key={label}
                                    color="inherit"
                                    href={href}
                                    component={Link}
                                    sx={{ textTransform: 'none' }}
                                >
                                    {label}
                                </Button>
                            ))}
                            {user ? <div className='flex items-center justify-center px-2'>Usuario:  <span className='font-bold'> {user.first_name}</span> </div> : <Button variant="outlined" color="inherit" href="/login">
                                Entrar
                            </Button>}

                        </Box>
                    )}

                    {/* Ícone para menu mobile */}
                    {isMobile && (
                        <IconButton
                            color="inherit"
                            edge="end"
                            onClick={handleDrawerToggle}
                            aria-label="menu"
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                </Toolbar>
            </AppBar>

            {/* Drawer para mobile */}
            <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={handleDrawerToggle}
            >
                {drawer}
            </Drawer>
        </>
    )
}
