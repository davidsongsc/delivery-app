'use client';

import React, { useRef, useState } from 'react';
import { Modal, Button } from 'antd';
import { LoginOutlined, UserOutlined } from '@ant-design/icons';
import LoginForm from '@/components/Login/Form';
import { useAuth } from '@/contexts/AuthContext';
import UserMenu from '@/components/MiniComponents/UserMenu';
import type { InputRef } from 'antd/es/input';
import { Typography } from 'antd/lib';

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
          <Button
            type="default"
            shape="circle"
            icon={<UserOutlined style={{ fontSize: 24, color: '#D32F2F' }} />}
            size="large"
            onClick={() => setUserMenuOpen((prev) => !prev)}
            className="shadow-lg hover:shadow-2xl transition-all duration-300 bg-white"
          />
          {userMenuOpen && <UserMenu user={user} onClose={() => setUserMenuOpen(false)} />}
        </>
      ) : (
        <>
          <Button
            type="primary"
            shape="circle"
            icon={<LoginOutlined style={{ fontSize: 24 }} />}
            size="large"
            onClick={() => setModalOpen(true)}
            className="bg-red-600 hover:bg-red-700 shadow-lg transition-all duration-300"
          />

          <Modal
            open={modalOpen}
            onCancel={() => setModalOpen(false)}
            footer={null}
            centered
            width={500}
            destroyOnHidden
            maskClosable
            className="rounded-2xl shadow-2xl border-t-8 border-red-600 overflow-hidden "
            closeIcon={<span className="text-gray-500 hover:text-gray-800 text-2xl">&times;</span>}
            bodyStyle={{ padding: '0 0 24px 0' }}
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
