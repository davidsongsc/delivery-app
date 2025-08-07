'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Modal, Button } from 'antd';
import { LoginOutlined, UserOutlined } from '@ant-design/icons';
import LoginForm from '@/components/Login/Form';
import { useAuthStore } from '@/store/authStore';
import { useLoginModal } from '@/contexts/LoginModalContext';
import { useRouter, usePathname } from 'next/navigation';
import type { InputRef } from 'antd';

export default function LoginModalIcon() {
    const user = useAuthStore(state => state.user);
    const { open, openModal, closeModal } = useLoginModal();
    const router = useRouter();
    const pathname = usePathname();
    const [forceOpenModal, setForceOpenModal] = useState(false);
    const [hasAccessViolation, setHasAccessViolation] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
    const initialCountdownStarted = useRef(false);
    const closeAttempts = useRef(0);
    const emailRef = useRef<InputRef | null>(null);
    const passwordRef = useRef<InputRef | null>(null);

    const isInputFocused = () => {
        const active = document.activeElement;
        return (
            active === emailRef.current ||
            active === passwordRef.current
        );
    };

    // Reset total ao voltar para página inicial
    useEffect(() => {
        const isAtHome = pathname === '/';

        if (isAtHome) {
            clearInterval(intervalRef.current!);
            clearTimeout(inactivityTimerRef.current!);
            intervalRef.current = null;
            inactivityTimerRef.current = null;
            initialCountdownStarted.current = false;
            closeAttempts.current = 0;
            setForceOpenModal(false);
            setHasAccessViolation(false);
            setIsTyping(false);
            if (open) closeModal();
        }
    }, [pathname]);



    // Início da contagem quando acesso é indevido
    useEffect(() => {
        const isInProtectedRoute = pathname && pathname !== '/' && !user;

        if (isInProtectedRoute) {
            setHasAccessViolation(true);
            setForceOpenModal(true);

            if (!initialCountdownStarted.current) {
                initialCountdownStarted.current = true;
            }
        }
    }, [pathname, user]);

    // Fechamento manual com limite de tentativas
    const handleModalClose = () => {
        closeAttempts.current += 1;
        if (closeAttempts.current >= 3) {
            router.push('/');
        } else {
            closeModal();
        }
    };

    if (user) {
        return (
            <div
                className='hidden'
                style={{
                    position: 'fixed',
                    bottom: 20,
                    right: 20,
                    zIndex: 1300,
                }}
            >
                <Button
                    type="primary"
                    shape="circle"
                    icon={<UserOutlined style={{ fontSize: 24 }} />}
                    size="large"
                    aria-label="Perfil do usuário"
                />
            </div>
        );
    }

    return (
        <>
            {!open && !forceOpenModal && (
                <div
                    className='cursor-pointer'
                    style={{
                        position: 'fixed',
                        bottom: 20,
                        right: 20,
                        zIndex: 1300,
                    }}
                >
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<LoginOutlined style={{ fontSize: 24 }} />}
                        size="large"
                        aria-label="Abrir login"
                        onClick={openModal}
                    />
                </div>
            )}

            <Modal
                title="Login de Usuário"
                className='cursor-pointer'
                open={open || forceOpenModal}
                onCancel={handleModalClose}
                footer={null}
                centered
                width={600}
                destroyOnClose
                maskClosable
            >
                <div style={{ position: 'relative' }}>
                    {hasAccessViolation && (
                        <div style={{
                            marginBottom: 16,
                            padding: 10,
                            backgroundColor: '#fffbe6',
                            border: '1px solid #ffe58f',
                            borderRadius: 4,
                            color: '#ad8b00',
                            fontWeight: 500,
                        }}>
                            ⚠️ Acesso indevido! Faça login para continuar.
                        </div>
                    )}

                    <LoginForm
                        onSuccess={closeModal}
                        emailRef={emailRef}
                        passwordRef={passwordRef}
                    />


                </div>
            </Modal>
        </>
    );
}
