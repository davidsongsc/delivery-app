import DeleteInColumn from '@/components/DeleteInColumn';
import { IPerfil } from '@/interfaces/IPerfil';
import { profileService } from '@/services/profile.service';
import { Tooltip } from 'antd';
import { ColumnGroupType } from 'antd/es/table';
import { ColumnType } from 'antd/lib/table';
import Link from 'next/link';
import React from 'react';
import { CiEdit } from 'react-icons/ci';

type ProfileColumnProps = (
  fetchData: () => void,
  userPermissions: string[]
) => (ColumnGroupType<any> | ColumnType<any>)[];

export const ProfileColumn: ProfileColumnProps = (fetchData, userPermissions) => {
  return [
    {
      title: 'Cargo',
      dataIndex: 'nome',
      key: 'nome',
    },
    {
      title: 'Função',
      key: 'tipos_nome',
      render: (_: any, record: IPerfil) => {
        if (!record.tipos || record.tipos.length === 0) return '-';
        const nomesTipos = record.tipos.map(t => t.nome).join(', ');
        return nomesTipos;
      },
    },
    // Como não tem nível no objeto novo, você pode:
    // 1. Remover essa coluna se não for relevante
    // 2. Ou deixar uma coluna vazia ou com '-'
    {
      title: 'Nível',
      key: 'nivel_nome',
      render: () => '-',
    },
    {
      title: 'Permissões',
      key: 'permissoes',
      render: (__, record: IPerfil) => {
        const permissoes = record.permissoes;
        if (!permissoes || permissoes.length === 0) return '-';

        const permissoesTooltip = permissoes.map(p => p.nome).join(', ');
        const exibidas = permissoes.slice(0, 5).map(p => p.nome).join(', ');
        const temMais = permissoes.length > 5;

        return (
          <Tooltip title={permissoesTooltip}>
            <span>{exibidas}{temMais ? '...' : ''}</span>
          </Tooltip>
        );
      },
    },
    {
      title: 'Ações',
      key: 'acoes',
      render: (_: any, record: IPerfil) => (
        <div className="flex justify-around">
          {userPermissions.includes('permissoes_editar') && (
            <Tooltip title="Editar">
              <Link href={`/dashboard/configuracoes/permissoes/${record.id}/editar`}>
                <CiEdit size={20} />
              </Link>
            </Tooltip>
          )}
          {userPermissions.includes('permissoes_deletar') && (
            <DeleteInColumn
              id={record.id}
              service={profileService}
              refresh={fetchData}
              title="Deseja deletar esse perfil?"
              successMessage="Perfil deletado com sucesso!"
              errorMessage="Erro ao deletar perfil"
            />
          )}
        </div>
      ),
    },
  ];
};
