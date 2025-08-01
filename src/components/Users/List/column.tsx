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
      title: 'Empresa',
      dataIndex: 'corporation',
      key: 'corporation',
    },
    {
      title: 'Ativo',
      dataIndex: 'is_active',
      key: 'is_active',
      render: (value: boolean) => (value ? 'Sim' : 'Não'),
    },
    {
      title: 'Administrador',
      dataIndex: 'is_superuser',
      key: 'is_superuser',
      render: (value: boolean) => (value ? 'Sim' : 'Não'),
    },
  
    {
      title: 'Ações',
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
              title="Deseja deletar esse curso?"
              successMessage="Curso deletado com sucesso!"
              errorMessage="Erro ao deletar curso"
            />
          )}
        </div>
      ),

    },
  ];
};
