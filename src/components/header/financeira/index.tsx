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
    ListItemText,
    ListItemButton,
    useTheme,
    Stepper,
    Step,
    StepLabel,
} from '@mui/material'
import Link from 'next/link'
import useMediaQuery from '@/hooks/useMediaQuery'
import { MenuIcon } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
interface SimuladorFinanceiraProps {
    etapaAtual: number;
}
export default function HeaderFinanceira({ etapaAtual }: SimuladorFinanceiraProps) {
    const [mobileOpen, setMobileOpen] = React.useState(false)
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const { user } = useAuthStore((state) => state)

    const handleDrawerToggle = () => setMobileOpen(!mobileOpen)
    const steps = ['Preencher Dados', 'Simulação', 'Proposta', 'Avaliação', 'Sugestões de Bancos', 'Resultados'];

    const navLinks = [
        { label: 'Simulador', href: '/simulador' },
        { label: 'Sobre', href: '/sobre' },
        { label: 'Contato', href: '/contato' },
    ]

    const drawer = (
        <Box sx={{ width: 250, p: 2 }} onClick={handleDrawerToggle}>
            <List>
                {navLinks.map(({ label, href }) => (
                    <ListItemButton key={label} component={Link} href={href}>
                        <ListItemText primary={label} />
                    </ListItemButton>
                ))}
                {!user && (
                    <ListItemButton component={Link} href="/login">
                        <ListItemText primary="Entrar" />
                    </ListItemButton>
                )}
            </List>
        </Box>
    )

    return (
        <>
            <AppBar
                position="relative"
                color="default"
            >
                <Toolbar sx={{ justifyContent: 'space-between', minHeight: 6 }}>
                    {!isMobile && (
                        <Box display="flex" alignItems="center" gap={2}>
                            {navLinks.map(({ label, href }) => (
                                <Button
                                    key={label}
                                    color="inherit"
                                    component={Link}
                                    href={href}
                                    sx={{ textTransform: 'none', fontSize: '0.9rem' }}
                                >
                                    {label}
                                </Button>
                            ))}
                            {user ? (
                                <Typography variant="body2" sx={{ ml: 2, fontWeight: 500 }}>
                                    Olá, <strong>{user.first_name}</strong>
                                </Typography>
                            ) : (
                                <Button variant="outlined" color="inherit" href="/login" size="small">
                                    Entrar
                                </Button>
                            )}
                        </Box>
                    )}

                    {/* Ícone Mobile */}
                    {isMobile && (
                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={handleDrawerToggle}
                            aria-label="menu"
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                </Toolbar>
                <Stepper activeStep={etapaAtual} alternativeLabel sx={{ mb: 6 }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </AppBar>

            <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
                {drawer}
            </Drawer>


        </>
    )
}
