import React, { useState } from 'react';
import { Card, Collapse, Tag, Button } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

// Assuming IPerfil is the user data object, not just a single profile.
import { IUser } from '@/interfaces/IUser'; // A more appropriate interface name

const { Panel } = Collapse;

interface ProfileViewerProps {
    userData: IUser;

}

const getGrupoNome = (prefix: string) => {
    const map: Record<string, string> = {
        sistema: 'Sistema',
        usuarios: 'Usuários',
        endereco: 'Endereços',
        permissoes: 'Permissões',
        estoque: 'Estoque',
        produto: 'Produtos',
        composicao: 'Composição',
        adicional: 'Adicionais',
        caixa: 'Caixa',
        comandas: 'Comandas',
        escala: 'Escala',
        afiliados: 'Afiliados',
        mensagens: 'Mensagens',
        // Adicione outros prefixos conforme necessário
    };
    return map[prefix] || 'Geral';
};

const agruparPermissoes = (
    permissoes: { codigo: string; nome: string }[] = []
): Record<string, { codigo: string; nome: string }[]> => {
    return permissoes.reduce((acc, perm) => {
        const prefix = perm.codigo.split('_')[0] || 'geral';
        if (!acc[prefix]) acc[prefix] = [];
        acc[prefix].push(perm);
        return acc;
    }, {} as Record<string, { codigo: string; nome: string }[]>);
};

const ProfileView: React.FC<ProfileViewerProps> = ({ userData }) => {
    const [expandedTipos, setExpandedTipos] = useState<Record<string, boolean>>({});

    const toggleTipo = (tipoId: string) => {
        setExpandedTipos((prev) => ({
            ...prev,
            [tipoId]: !prev[tipoId],
        }));
    };
    return (
        <Card title="Detalhes do Usuário" bordered className="mb-1">
            <p><strong>Nome de Usuário:</strong> {userData?.username || '-'}</p>
            <p><strong>E-mail:</strong> {userData?.email || '-'}</p>
            <p><strong>Corporação:</strong> {userData?.corporation || '-'}</p>

            <Collapse ghost>
                {userData.perfis?.length > 0 ? (
                    userData.perfis.map(perfil => (
                        <Panel header={perfil.nome} key={perfil.id}>
                            <p><strong>Descrição:</strong> {perfil.descricao || '-'}</p>
                            {perfil.tipos?.length > 0 ? (
                                perfil.tipos.map((tipo) => {
                                    const tipoId = tipo.id;
                                    const expanded = expandedTipos[tipoId] || false;
                                    const permissoes = tipo.nivel?.permissoes || [];

                                    return (
                                        <div key={tipoId} className="ml-4 my-4 p-4 border-l-2 border-gray-200">
                                            <p><strong>Tipo:</strong> {tipo.nome || '-'}</p>
                                            <p><strong>Nível:</strong> {tipo.nivel?.nome || '-'}</p>

                                            {permissoes.length > 0 && (
                                                <Button
                                                    size="small"
                                                    type="link"
                                                    icon={expanded ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                                                    onClick={() => toggleTipo(tipoId)}
                                                    className="mb-2 mt-1"
                                                >
                                                    {expanded ? 'Ocultar permissões' : `Mostrar permissões (${permissoes.length})`}
                                                </Button>
                                            )}

                                            {expanded && (
                                                <>
                                                    <h4 className="font-semibold mt-4">Permissões:</h4>
                                                    {Object.entries(agruparPermissoes(permissoes)).map(([prefix, grupo]) => (
                                                        <div key={prefix} className="my-2">
                                                            <h5 className="font-bold">{getGrupoNome(prefix)}</h5>
                                                            <div className="flex flex-wrap gap-2 mt-2">
                                                                {grupo.map((perm) => (
                                                                    <Tag key={perm.codigo} color="blue" className="text-sm uppercase">
                                                                        {perm.nome}
                                                                    </Tag>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </>
                                            )}
                                        </div>
                                    );
                                })
                            ) : (
                                <p className="ml-4">Nenhum tipo de perfil encontrado.</p>
                            )}
                        </Panel>
                    ))
                ) : (
                    <p>Nenhum perfil encontrado para este usuário.</p>
                )}
            </Collapse>
        </Card>
    );
};

export default React.memo(ProfileView);