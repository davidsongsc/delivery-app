'use client';

import React, { useRef, useState } from 'react';
import { Modal, Button } from 'antd/es';
import LoginForm from '@/components/Login/Form';
import { useAuth } from '@/contexts/AuthContext';
import UserMenu from '@/components/MiniComponents/UserMenu';
import type { InputRef } from 'antd/es/input';
import { Typography } from 'antd/lib';
import dynamic from "next/dynamic";

const LoginOutlined = dynamic(
  () => import("@ant-design/icons/LoginOutlined"),
  { ssr: false }
);

const UserOutlined = dynamic(
  () => import("@ant-design/icons/UserOutlined"),
  { ssr: false }
);


export default function LoginModalIcon() {
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const emailRef = useRef<InputRef | null>(null);
  const passwordRef = useRef<InputRef | null>(null);

  return (
    <div className="fixed bottom-5 right-5 z-[1300] flex flex-col items-end gap-2">
      {user ? (
        <>
          <span></span>
        </>
      ) : (
        <>
          <Button
            type="primary"
            shape="circle"
            icon={<LoginOutlined className='text-secondary ' />}
            style={{ fontSize: '18px', lineHeight: '24px' }}
            size="large"
            onClick={() => setModalOpen(true)}
            className="bg-primary hover:bg-tertiary hover:scale-125 shadow-lg transition-all duration-300"
          />

          <Modal
            open={modalOpen}
            onCancel={() => setModalOpen(false)}
            footer={null}
            centered
            width={500}
            destroyOnHidden
            maskClosable
            className="rounded-2xl shadow-2xl border-t-8 border-primary overflow-hidden "
            closeIcon={<span className="text-primary hover:text-tertiary text-2xl">&times;</span>}

          >
            <Typography.Title level={3} className="text-center font-bold text-yellow-500 mb-6">
              Login
            </Typography.Title>

            <LoginForm onSuccess={() => setModalOpen(false)} emailRef={emailRef} passwordRef={passwordRef} />
          </Modal>
        </>
      )}
    </div>
  );
}
