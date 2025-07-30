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
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
    },
    {
      title: 'Descrição',
      dataIndex: 'descricao',
      key: 'descricao',
    },
    {
      title: 'Tipo',
      dataIndex: ['tipo', 'nome'],
      key: 'tipo',
    },
    {
      title: 'Nível',
      dataIndex: ['nivel', 'nome'],
      key: 'nivel',
    },
    {
      title: 'Permissões',
      dataIndex: ['nivel', 'permissoes'],
      key: 'permissoes',
      render: (permissoes: { codigo: string; nome: string }[]) => {
        if (!permissoes || permissoes.length === 0) return '-';

        const exibidas = permissoes.slice(0, 5).map(p => p.nome).join(', ');
        const temMais = permissoes.length > 5;

        return temMais ? `${exibidas}...` : exibidas;
      },
    },

    {
      title: 'Ações',
      key: 'acoes',
      render: (_: any, record: IPerfil) => (
        <div className="flex justify-around">
          {userPermissions.includes('permissoes_editar') && (
            <Tooltip title="Editar">
              <Link href={`/dashboard/configuracoes/perfis/${record.id}/editar`}>
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
