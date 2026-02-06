'use client';

import React from 'react';
import { App } from 'antd';
import MessagePanel from '@/components/MessagePanel';
import { useAuth } from '@/contexts/AuthContext';
import NotFound from '@/app/not-found';

const MessagePage: React.FC = () => {
  const { user, permissions } = useAuth();
  if (!permissions.includes('forneceores_acesso_visualizar')) return NotFound();

  return (
    <App>
      <div style={{ padding: '24px' }}>
        <MessagePanel currentUser={user!} />
      </div>
    </App>
  );
};

export default MessagePage;
