'use client';

import React, { useRef, useState } from 'react';
import { Modal, Button } from 'antd';
import { LoginOutlined, UserOutlined } from '@ant-design/icons';
import LoginForm from '@/components/Login/Form';
import { useAuthStore } from '@/store/authStore';
import { useLoginModal } from '@/contexts/LoginModalContext';
import { useRouter } from 'next/navigation';
import type { InputRef } from 'antd/es/input';

export default function LoginModalIcon() {
  const user = useAuthStore(state => state.user);
  const { open, openModal, closeModal } = useLoginModal();
  const router = useRouter();
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);

  const emailRef = useRef<InputRef | null>(null);
  const passwordRef = useRef<InputRef | null>(null);

  const handleModalClose = () => {
    closeModal();
  };


  if (user) {
    return (
      <div className="fixed bottom-5 right-5 z-[1300]">
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
      {/* Ícone de login */}
      {!open && (
        <div className="fixed bottom-5 right-5 z-[1300]" aria-label="Abrir login">
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

      {/* Modal de login */}
      <Modal
        open={open}
        onCancel={handleModalClose}
        footer={null}
        centered
        width={480}
        destroyOnHidden
        maskClosable
        className="rounded-lg shadow-xl"
        closeIcon={<span className="text-gray-500 hover:text-gray-800">&times;</span>}
      >
        <LoginForm
          onSuccess={handleModalClose}
          emailRef={emailRef}
          passwordRef={passwordRef}
        />
      </Modal>
    </>
  );
}
