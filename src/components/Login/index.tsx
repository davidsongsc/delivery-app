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
          className="fixed bottom-5 right-5 z-[1300]"
          aria-label="Abrir login"
        >
          <Button
            type="primary"
            shape="circle"
            icon={<LoginOutlined style={{ fontSize: 24 }} />}
            size="large"
            onClick={openModal}
            className="shadow-lg hover:shadow-xl transition-shadow duration-300"
          />
        </div>
      )}

      <Modal
        open={open || forceOpenModal}
        onCancel={handleModalClose}
        footer={null}
        centered
        width={480}
        destroyOnClose
        maskClosable
        
        className="rounded-lg shadow-xl"
        closeIcon={<span className="text-gray-500 hover:text-gray-800">&times;</span>}
      >
        <div className="relative">
          {hasAccessViolation && (
            <div className="mb-4 p-3 bg-yellow-100 border border-yellow-300 rounded text-yellow-800 font-medium flex items-center gap-2">
              <span>⚠️</span> Acesso indevido! Faça login para continuar.
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
