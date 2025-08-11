import { useState } from 'react';
import { Dropdown, Modal, Menu } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';

export default function UserMenu({ user }) {
    const [isModalVisible, setIsModalVisible] = useState(false);

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
            onClick: () => console.log('Fazer logout'),
        },
    ];

    return (
        <>
            <Dropdown menu={{ items }} trigger={['click']}>
                <div className="flex items-center gap-2 cursor-pointer">
                    <UserOutlined />
                    <span className="font-bold capitalize">{user.first_name}</span>
                    <span className="font-italic text-sm ">|</span>
                    {ultimoPerfil && (
                        <>
                            <span>{ultimoPerfil.nome}</span>
                            {ultimoTipo && <span className="font-italic text-sm ">{ultimoTipo.nome}</span>}
                        </>
                    )}
                </div>
            </Dropdown>

            <Modal
                title="Meu Perfil"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <p><strong>Nome:</strong> {user.first_name} {user.last_name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                {ultimoPerfil && (
                    <>
                        <p><strong>Perfil:</strong> {ultimoPerfil.nome}</p>
                        {ultimoTipo && <p><strong>Tipo:</strong> {ultimoTipo.nome}</p>}
                    </>
                )}
            </Modal>
        </>
    );
}
