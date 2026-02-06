'use client';

import React, { useState, useMemo } from 'react';
import { useWahaContacts } from '@/hooks/useContacts';
import { Spin, Input, Avatar, Badge, Typography, Modal } from 'antd';
import BulkUserCreate from '@/components/Users/BulkUserCreate';
import Chat from '@/components/Chat/conversa';
import { useAuth } from '@/contexts/AuthContext';

const { Text } = Typography;
const { Search } = Input;

const ChatLayout: React.FC<{ tenantId: string }> = ({ tenantId }) => {
    const { contacts, loading, error } = useWahaContacts();
    const [open, setOpen] = useState(false);
    const [filter, setFilter] = useState('');
    const [activeContact, setActiveContact] = useState<string | null>(null);
    const [activeName, setActiveName] = useState<string | null>(null);

    const { permissions } = useAuth();

    const filteredContacts = useMemo(() => {
        if (!filter) return contacts;
        const term = filter.toLowerCase().replace(/\s+/g, '');
        return contacts.filter(contact =>
            (contact.name && contact.name.toLowerCase().includes(term)) ||
            (contact.id && contact.id.replace(/[@c.us]/g, '').includes(term))
        );
    }, [contacts, filter]);

    if (loading) return <Spin tip="Carregando contatos..." style={{ marginTop: 50 }} />;
    if (error) return <div style={{ color: 'red', marginTop: 50 }}>{error}</div>;

    return (
        <>
            <div className="flex h-[90vh] border rounded overflow-hidden shadow">
                {/* Sidebar */}
                <div className="w-80 border-r flex flex-col">
                    <div className="p-4 flex flex-col gap-4">
                        <Search
                            placeholder="Pesquisar contatos"
                            allowClear
                            onChange={(e) => setFilter(e.target.value)}
                        />
                        <button
                            className={`bg-blue-600 text-white py-2 px-3 rounded hover:bg-blue-700 disabled:opacity-50`}
                            onClick={() => setOpen(true)}
                            disabled={!permissions.includes('usuarios_criar')}
                        >
                            Cadastrar em Massa
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {filteredContacts.map((contact) => (
                            <div
                                key={contact.id}
                                className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 ${activeContact === contact.id ? 'bg-gray-200' : ''
                                    }`}
                                onClick={() => {
                                    setActiveContact(contact.id);
                                    setActiveName(contact.name || contact.pushname || contact.id);
                                }}
                            >
                                <Badge dot status="success">
                                    <Avatar>{(contact.name || contact.pushname || 'U')[0]}</Avatar>
                                </Badge>
                                <div className="flex flex-col">
                                    <Text strong>{contact.name || contact.pushname || contact.id}</Text>
                                    <Text type="secondary" className="text-xs">
                                        {contact.id.replace(/@c.us/, '')}
                                    </Text>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Área de Chat */}
                <div className="flex-1">
                    {activeContact ? (
                        <Chat chatId={activeContact} contactName={activeName!} />
                    ) : (
                        <div className="flex justify-center items-center h-full text-gray-400">
                            <Text>Selecione um contato para iniciar a conversa</Text>
                        </div>
                    )}
                </div>
            </div>

            <Modal
                open={open}
                onCancel={() => setOpen(false)}
                footer={null}
                width={800}
                title="Cadastro em Massa"
            >
                <BulkUserCreate />
            </Modal>
        </>
    );
};

export default React.memo(ChatLayout);
