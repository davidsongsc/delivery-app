'use client';

import React, { useState } from 'react';
import { useWebSocket } from '@/hooks/useWebSocket';
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
} from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { IUser } from '@/interfaces/IUser';

const { Sider, Content } = Layout;
const { TextArea } = Input;
const { Text } = Typography;

interface MessagePanelProps {
  tenantId: string;
  currentUser: IUser;
}

const MessagePanel: React.FC<MessagePanelProps> = ({ tenantId, currentUser }) => {
  if (!currentUser) {
    return null;
  }
  
  const [messageText, setMessageText] = useState('');
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const { users, usersLoading } = useChatUsers();
  const { messages, isConnected, sendMessage } = useWebSocket(tenantId);

  const handleSendMessage = () => {
    if (messageText.trim() && selectedUser) {
      // Ajuste na chamada: envia a mensagem como 'corpo'
      sendMessage(messageText, selectedUser.id!);
      setMessageText('');
    }
  };

  const currentConversation = selectedUser ? messages.filter(
    (msg: any) => {
      if (!msg || !msg.remetente_id || !msg.destinatario_id) {
        return false;
      }
      return (msg.remetente_id === currentUser.id && msg.destinatario_id === selectedUser.id) ||
        (msg.remetente_id === selectedUser.id && msg.destinatario_id === currentUser.id);
    }
  ) : [];

  if (usersLoading) {
    return <Spin size="large" />;
  }

  // Lógica para ordenar usuários: online primeiro
  const usersForChat = users.filter(user => user.id !== currentUser.id).sort((a, b) => {
    const aIsOnline = isConnected; // Lógica simplificada: se o WebSocket está conectado, o usuário está online
    const bIsOnline = isConnected; // Em um sistema real, essa lógica seria mais complexa
    if (aIsOnline && !bIsOnline) return -1;
    if (!aIsOnline && bIsOnline) return 1;
    return 0;
  });

  return (
    <Layout style={{ minHeight: '100vh', background: '#fff' }}>
      <Sider width={250} style={{ background: '#f0f2f5' }}>
        <Card
          title={
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>Usuários Online</span>
              <Text strong style={{ color: isConnected ? 'green' : 'red' }}>
                ({usersForChat.length})
              </Text>
            </div>
          }
          style={{ height: '100%' }}
        >
          <List
            dataSource={usersForChat}
            renderItem={(user) => (
              <List.Item
                style={{ cursor: 'pointer', background: selectedUser?.id === user.id ? '#e6f7ff' : 'transparent' }}
                onClick={() => setSelectedUser(user)}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {isConnected ? (
                    <CheckCircleOutlined style={{ color: 'green', marginRight: '8px' }} />
                  ) : (
                    <CloseCircleOutlined style={{ color: 'red', marginRight: '8px' }} />
                  )}
                  <Text strong>{user.username}</Text>
                </div>
              </List.Item>
            )}
          />
        </Card>
      </Sider>
      <Content style={{ padding: '0 24px', background: '#fff' }}>
        <Card
          title={selectedUser ? `Conversa com ${selectedUser.username}` : 'Selecione um usuário para conversar'}
          style={{ height: '100%' }}
        >
          {!isConnected ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <Spin size="large" />
              <p>Conectando ao servidor...</p>
            </div>
          ) : (
            <>
              {selectedUser ? (
                <>
                  <List
                    dataSource={currentConversation}
                    style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}
                    renderItem={(item, index) => (
                      <List.Item key={index} style={{ justifyContent: item.remetente_id === currentUser.id ? 'flex-end' : 'flex-start' }}>
                        <Card
                          size="small"
                          style={{
                            maxWidth: '70%',
                            backgroundColor: item.remetente_id === currentUser.id ? '#e6f7ff' : '#f0f0f0',
                            borderRadius: '8px',
                          }}
                        >
                          <Text strong>{item.remetente}:</Text> {item.corpo}
                        </Card>
                      </List.Item>
                    )}
                  />
                  <Divider />
                  <Input.Group compact style={{ display: 'flex' }}>
                    <TextArea
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="Digite sua mensagem aqui..."
                      style={{ flex: 1 }}
                      onPressEnter={handleSendMessage}
                    />
                    <Button
                      type="primary"
                      onClick={handleSendMessage}
                      disabled={!messageText.trim()}
                    >
                      Enviar
                    </Button>
                  </Input.Group>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <Text type="secondary">Selecione um usuário para iniciar a conversa.</Text>
                </div>
              )}
            </>
          )}
        </Card>
      </Content>
    </Layout>
  );
};

export default React.memo(MessagePanel);
