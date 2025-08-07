import DeleteInColumn from '@/components/DeleteInColumn';
import { Tag, Tooltip } from 'antd';
import { ColumnGroupType } from 'antd/es/table';
import { ColumnType } from 'antd/lib/table';
import dayjs from 'dayjs';
import Link from 'next/link';
import React from 'react';
import { CiEdit } from 'react-icons/ci';

import { IUser } from '@/interfaces/IUser';
import { userService } from '@/services/user.service';

type UserColumnProps = (fetchData: () => void,
  userPermissions: string[]) => (ColumnGroupType<any> | ColumnType<any>)[];

export const UserColumn: UserColumnProps = (fetchData, userPermissions) => {
  return [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Usuário',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Nome',
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      title: 'Sobrenome',
      dataIndex: 'last_name',
      key: 'last_name',
    },
    /*
    {
      title: 'CPF',
      dataIndex: 'cpf',
      key: 'cpf',
    },
    {
      title: 'RG',
      dataIndex: 'rg',
      key: 'rg',
    },
    */
    {
      title: 'Telefone',
      dataIndex: 'phone',
      key: 'phone',
      render: (value: string | null) => value ?? '-',
    },
    /*
    {
      title: 'Empresa',
      dataIndex: 'corporation',
      key: 'corporation',
    },
    */
    {
      title: 'Ativo',
      dataIndex: 'is_active',
      key: 'is_active',
      render: (value: boolean) => (value ? 'Sim' : 'Não'),
    },
    /*
    {
      title: 'Administrador',
      dataIndex: 'is_superuser',
      key: 'is_superuser',
      render: (value: boolean) => (value ? 'Sim' : 'Não'),
    },
    */
    {
      title: 'Criado em',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (value: string) => dayjs(value).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (_, record: IUser) => (
        <div className="flex justify-around">
          {userPermissions.includes('usuarios_visualizar') && (
            <Tooltip title="Editar">
              <Link href={`/dashboard/configuracoes/usuarios/${record.id}/editar`}>
                <CiEdit size={20} />
              </Link>
            </Tooltip>
          )}
          {userPermissions.includes('usuarios_deletar') && (
            <DeleteInColumn
              id={record.id}
              service={userService}
              refresh={fetchData}
              title="Deseja deletar esse usuário?"
              successMessage="Usuário deletado com sucesso!"
              errorMessage="Erro ao deletar usuário"
            />
          )}
        </div>
      ),
    },
  ];
};
