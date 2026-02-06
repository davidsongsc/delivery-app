'use client';
import React, { useState, useRef, useEffect } from 'react';
import { List, Input, Button, Badge, Typography, Divider } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { useChat } from '@/hooks/useChat';

const { Text } = Typography;

interface ChatProps {
  userId: string;
  tenantId: string;
}

const Chat: React.FC<ChatProps> = ({ userId, tenantId }) => {
  const { messages, sendMessage, onlineUsers } = useChat(userId, tenantId);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll automático para a última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === '') return;
    // Aqui, destinatario_id precisa ser selecionado ou definido pelo fluxo
    const destinatarioId = onlineUsers[0]?.id || '1';
    sendMessage(input, destinatarioId);
    setInput('');
  };

  return (
    <div style={{ display: 'flex', height: '100%', flexDirection: 'column', border: '1px solid #f0f0f0', borderRadius: 8 }}>
      {/* Lista de usuários online */}
      <div style={{ padding: '8px', borderBottom: '1px solid #f0f0f0', backgroundColor: '#fafafa' }}>
        <Text strong>Online:</Text>
        {onlineUsers.map((user) => (
          <Badge
            key={user.id}
            status="success"
            text={user.username}
            style={{ marginLeft: 8 }}
          />
        ))}
      </div>

      {/* Lista de mensagens */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', backgroundColor: '#fff' }}>
        <List
          dataSource={messages}
          renderItem={(msg) => (
            <List.Item>
              <div style={{ width: '100%' }}>
                <Text strong>{msg.remetente || 'Atendente'}:</Text> <Text>{msg.corpo}</Text>
                {msg.status_lida ? (
                  <Text type="secondary" style={{ float: 'right' }}>✓✓</Text>
                ) : msg.status_recebida ? (
                  <Text type="secondary" style={{ float: 'right' }}>✓</Text>
                ) : null}
              </div>
            </List.Item>
          )}
        />
        <div ref={messagesEndRef} />
      </div>

      {/* Input e botão de envio */}
      <div style={{ display: 'flex', padding: '8px', borderTop: '1px solid #f0f0f0', backgroundColor: '#fafafa' }}>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onPressEnter={handleSend}
          placeholder="Digite sua mensagem..."
          style={{ marginRight: 8 }}
        />
        <Button type="primary" icon={<SendOutlined />} onClick={handleSend}>
          Enviar
        </Button>
      </div>
    </div>
  );
};

export default React.memo(Chat);
