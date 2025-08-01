import React, { useState, useMemo } from 'react';
import { Card, Collapse, Tag, Button } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { IPerfil } from '@/interfaces/IPerfil';

const { Panel } = Collapse;

interface ProfileViewerProps {
    perfil: IPerfil;
}

const getGrupoNome = (prefix: string) => {
    const map: Record<string, string> = {
        usuarios: 'Usuários',
        endereco: 'Endereços',
        permissoes: 'Permissões',
        sistema: 'Sistema',
        produto: 'Produtos',
        estoque: 'Estoque',
        composicao: 'Composição',
        adicional: 'Adicionais',
        caixa: 'Caixa',
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

const ProfileView: React.FC<ProfileViewerProps> = ({ perfil }) => {
    const permissoes = perfil?.tipo?.nivel?.permissoes || [];

    const permissoesAgrupadas = useMemo(() => agruparPermissoes(permissoes), [permissoes]);

    const [gruposExpandidos, setGruposExpandidos] = useState<Record<string, boolean>>({});

    const toggleGrupo = (prefix: string) => {
        setGruposExpandidos(prev => ({
            ...prev,
            [prefix]: !prev[prefix],
        }));
    };

    return (
        <Card title={perfil?.nome} bordered className="mb-1">
            <p><strong>Descrição:</strong> {perfil.descricao || '-'}</p>
            <p><strong>Tipo:</strong> {perfil.tipo?.nome || '-'}</p>
            <p><strong>Nível:</strong> {perfil.tipo?.nivel?.nome || '-'}</p>

            <Collapse ghost defaultActiveKey={['1']}>
                <Panel header="Permissões" key="1">
                    {Object.entries(permissoesAgrupadas).map(([prefixo, grupo]) => {
                        const grupoNome = getGrupoNome(prefixo);
                        const mostrarTodas = gruposExpandidos[prefixo] || false;
                        const permissoesParaExibir = mostrarTodas ? grupo : grupo.slice(0, 6);

                        return (
                            <div key={prefixo} className="mb-6 overflow-hidden">
                                <p className="font-semibold mb-2">{grupoNome}:</p>
                                <div className="grid grid-cols-4 lg:grid-cols-8 2xl:grid-cols-12 gap-2">
                                    {permissoesParaExibir.map(p => (
                                        <Tag key={p.codigo} color="blue" className="p-2 text-center uppercase rounded-md text-lg col-span-6 lg:col-span-3 2xl:col-span-2">
                                            {p.nome.replace(new RegExp(`^${grupoNome}\\s*`, 'i'), '')}
                                        </Tag>
                                    ))}
                                </div>
                                {grupo.length > 6 && (
                                    <div className="mt-2">
                                        <Button
                                            size="small"
                                            type="link"
                                            icon={mostrarTodas ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                                            onClick={() => toggleGrupo(prefixo)}
                                        >
                                            {mostrarTodas ? 'Ocultar extras' : 'Mostrar todas'}
                                        </Button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                    {permissoes.length === 0 && <p>Nenhuma permissão encontrada.</p>}
                </Panel>
            </Collapse>
        </Card>
    );
};

export default React.memo(ProfileView);
