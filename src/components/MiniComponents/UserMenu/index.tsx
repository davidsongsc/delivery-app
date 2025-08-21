'use client';

import { useEffect, useState } from 'react';
import { Dropdown, Modal, Divider, Button } from 'antd/es';
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { useAuth } from '@/contexts/AuthContext';

export default function UserMenu() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { user, isAuthenticated, logout } = useAuth();
    if (!user) return null;

    const ultimoPerfil = user.perfis?.[user.perfis.length - 1];
    const ultimoTipo = ultimoPerfil?.tipos?.[ultimoPerfil.tipos.length - 1];

    const items = [
        {
            key: 'profile',
            icon: <UserOutlined />,
            label: 'Meu Perfil',
            onClick: () => setIsModalVisible(true),
        },
        {
            key: 'settings',
            icon: <SettingOutlined />,
            label: 'Configurações',
            onClick: () => console.log('Ir para configurações'),
        },
        {
            type: 'divider',
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Sair',
            onClick: () => { logout() },
        },
    ];

    return (
        <>
            <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight">

                <div className="flex items-center gap-3 cursor-pointer bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-lg shadow-sm transition-colors">
                    <span
                        className={`w-3 h-3 rounded-full ${isAuthenticated ? 'bg-green-500' : 'bg-red-500'}`}
                        title={isAuthenticated ? 'Ativo' : 'Inativo'}
                    />
                    <UserOutlined className="text-gray-700 text-lg" />
                    <div className="flex flex-col leading-tight">
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900">{user.first_name}</span>

                        </div>
                        {ultimoPerfil && (
                            <span className="text-gray-500 text-sm">
                                {ultimoPerfil.nome}{ultimoTipo ? ` • ${ultimoTipo.nome}` : ''}
                            </span>
                        )}
                    </div>
                </div>
            </Dropdown>

            <Modal
                title="Meu Perfil"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                centered
                className="rounded-xl"
            >
                <div className="space-y-3 text-gray-800">
                    <p><strong>Nome:</strong> {user.first_name} {user.last_name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    {ultimoPerfil && <p><strong>Perfil:</strong> {ultimoPerfil.nome}</p>}
                    {ultimoTipo && <p><strong>Tipo:</strong> {ultimoTipo.nome}</p>}
                    <p><strong>Status:</strong> <span className={`font-bold ${isAuthenticated ? 'text-green-600' : 'text-red-600'}`}>{isAuthenticated ? 'Ativo' : 'Inativo'}</span></p>
                </div>
                <Divider />
                <div className="flex justify-end gap-2">
                    <Button type="default" onClick={() => console.log('Configurações')}>
                        Configurações
                    </Button>
                    <Button type="primary" danger onClick={() => logout()}>
                        Sair
                    </Button>
                </div>
            </Modal>
        </>
    );
}
