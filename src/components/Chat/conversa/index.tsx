'use client';
import React, { useState, useEffect } from 'react';
import { List, Input, Button, Typography, Spin } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { useChatSocket, MensagemChat } from '@/hooks/useChatSocket';

const { Text } = Typography;

interface ChatProps {
  chatId: string;
  contactName: string;
}

const Chat: React.FC<ChatProps> = ({ chatId, contactName }) => {
  const { messages, sendMessage, connected, messagesEndRef } = useChatSocket(chatId);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', border: '1px solid #f0f0f0', borderRadius: 8 }}>

      {/* Cabeçalho */}
      <div style={{ padding: 12, borderBottom: '1px solid #f0f0f0', backgroundColor: '#fafafa' }}>
        <Text strong>{contactName || chatId.replace(/@c.us$/, '')}</Text>
        <br />
        <Text type="secondary" className="text-xs">{chatId.replace(/@c.us$/, '')}</Text>
        <br />
        <Text type={connected ? 'success' : 'warning'} className="text-xs">
          {connected ? 'Conectado' : 'Desconectado'}
        </Text>
      </div>

      {/* Mensagens */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 16, backgroundColor: '#e5ddd5' }}>
        {messages.length === 0 && !connected ? (
          <div className="flex justify-center items-center"><Spin /></div>
        ) : (
          <List
            dataSource={messages} // mensagens já do mais antigo para o mais recente
            renderItem={(msg: MensagemChat) => {
              const isMe = msg.fromMe;
              return (
                <List.Item
                  style={{
                    display: 'flex',
                    justifyContent: isMe ? 'flex-end' : 'flex-start',
                    padding: '4px 0'
                  }}
                >
                  <div
                    style={{
                      backgroundColor: isMe ? '#DCF8C6' : '#fff',
                      padding: '8px 12px',
                      borderRadius: 16,
                      maxWidth: '70%',
                      wordBreak: 'break-word'
                    }}
                  >
                    <Text style={{ fontSize: 14 }}>{msg.corpo}</Text>
                  </div>
                </List.Item>
              );
            }}
          />

        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{ display: 'flex', padding: 8, borderTop: '1px solid #f0f0f0', backgroundColor: '#fafafa' }}>
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
