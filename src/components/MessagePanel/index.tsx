'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useChat } from '@/hooks/useChat';
import { useChatUsers } from '@/hooks/useChatUsers';
import {
  Spin,
  List,
  Input,
  Button,
  Card,
  Typography,
  Divider,
  Layout,
  Empty,
} from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { IUser } from '@/interfaces/IUser';

const { Sider, Content } = Layout;
const { TextArea } = Input;
const { Text } = Typography;

interface MessagePanelProps {
  tenantId?: string | ''; 
  currentUser: IUser;
}

const MessagePanel: React.FC<MessagePanelProps> = ({ tenantId = '', currentUser }) => {
  const [messageText, setMessageText] = useState('');
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { users, usersLoading } = useChatUsers();
  const { messages, onlineUsers, isConnected, sendMessage } = useChat(
    currentUser.id,
    tenantId || '',
  );

  // Scroll automático para última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, selectedUser]);

  const otherUsers = users.filter((u) => u.id !== currentUser.id);

  const usersForChat = otherUsers.sort((a, b) => {
    const aOnline = onlineUsers.some((user) => user.id === a.id);
    const bOnline = onlineUsers.some((user) => user.id === b.id);
    if (aOnline && !bOnline) return -1;
    if (!aOnline && bOnline) return 1;
    return 0;
  });

  const currentConversation = selectedUser
    ? messages.filter((msg) => {
      if (!msg.remetente_id || !msg.destinatario_id) return false;
      return (
        (msg.remetente_id === currentUser.id && msg.destinatario_id === selectedUser.id) ||
        (msg.remetente_id === selectedUser.id && msg.destinatario_id === currentUser.id)
      );
    })
    : [];

  const handleSendMessage = () => {
    if (messageText.trim() && selectedUser) {
      sendMessage(messageText.trim(), selectedUser.id);
      setMessageText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (usersLoading) {
    return (
      <div style={{ padding: 50, textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh', background: '#fff' }}>
      <Sider
        width={280}
        style={{
          background: '#f0f2f5',
          borderRight: '1px solid #ddd',
          overflowY: 'auto',
          padding: '16px 8px',
        }}
      >
        <Card
          title={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text strong>Usuários</Text>
              <Text type={isConnected ? 'success' : 'danger'}>
                {isConnected ? 'Online' : 'Offline'}
              </Text>
            </div>
          }
          bordered={false}
          bodyStyle={{ padding: 0 }}
        >
          <List
            dataSource={usersForChat}
            locale={{ emptyText: 'Nenhum usuário disponível' }}
            renderItem={(user) => {
              const isOnline = onlineUsers.some((u) => u.id === user.id);
              return (
                <List.Item
                  key={user.id}
                  style={{
                    cursor: 'pointer',
                    background: selectedUser?.id === user.id ? '#bae7ff' : undefined,
                    padding: '10px 16px',
                    borderRadius: 4,
                    margin: '4px 8px',
                  }}
                  onClick={() => setSelectedUser(user)}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {isOnline ? (
                      <CheckCircleOutlined style={{ color: 'green', marginRight: 8 }} />
                    ) : (
                      <CloseCircleOutlined style={{ color: 'red', marginRight: 8 }} />
                    )}
                    <Text strong>{user.username}</Text>
                  </div>
                </List.Item>
              );
            }}
          />
        </Card>
      </Sider>

      <Layout>
        <Content style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <Card
            title={selectedUser ? `Conversa com ${selectedUser.username}` : 'Selecione um usuário para conversar'}
            style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
          >
            {!isConnected ? (
              <div style={{ textAlign: 'center', padding: 40 }}>
                <Spin size="large" />
                <p>Conectando ao servidor...</p>
              </div>
            ) : !selectedUser ? (
              <Empty description="Nenhuma conversa selecionada" />
            ) : (
              <>
                <List
                  dataSource={currentConversation}
                  style={{ flexGrow: 1, overflowY: 'auto', marginBottom: 16 }}
                  renderItem={(item, idx) => {
                    const isOwnMessage = item.remetente_id === currentUser.id;
                    return (
                      <List.Item
                        key={idx}
                        style={{
                          justifyContent: isOwnMessage ? 'flex-end' : 'flex-start',
                          padding: '4px 0',
                        }}
                      >
                        <Card
                          size="small"
                          style={{
                            maxWidth: '70%',
                            backgroundColor: isOwnMessage ? '#e6f7ff' : '#f5f5f5',
                            borderRadius: 8,
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                            wordBreak: 'break-word',
                          }}
                        >
                          <Text strong>{isOwnMessage ? 'Você' : item.remetente}:</Text>{' '}
                          <Text>{item.corpo}</Text>
                        </Card>
                      </List.Item>
                    );
                  }}
                />
                <div ref={messagesEndRef} />
                <Divider />
                <Input.TextArea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={3}
                  placeholder={`Mensagem para ${selectedUser.username}`}
                  maxLength={1000}
                  allowClear
                />
                <Button
                  type="primary"
                  onClick={handleSendMessage}
                  disabled={!messageText.trim()}
                  style={{ marginTop: 12, alignSelf: 'flex-end' }}
                >
                  Enviar
                </Button>
              </>
            )}
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
};

export default React.memo(MessagePanel);
