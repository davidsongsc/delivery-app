'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import MessagePanel from '@/components/MessagePanel';
import { App } from 'antd';
import { useAuth } from '@/contexts/AuthContext';

// A props 'params' contém os parâmetros da URL, como tenantId
interface MessagePageProps {
  params: {
    tenantId: string;
  };
}

const MessagePage: React.FC<MessagePageProps> = ({ params }) => {
  const { tenantId } = params;
  const { user } = useAuth();
  return (
    <App>
      <div style={{ padding: '24px' }}>
        <MessagePanel tenantId={tenantId} currentUser={user!} />
      </div>
    </App>
  );
};

export default MessagePage;
