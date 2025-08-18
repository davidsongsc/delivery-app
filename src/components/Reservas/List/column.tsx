import { Tag, Tooltip } from 'antd';
import { ColumnGroupType } from 'antd/es/table';
import { ColumnType } from 'antd/lib/table';
import dayjs from 'dayjs';
import Link from 'next/link';
import React from 'react';
import { CiEdit } from 'react-icons/ci';

import DeleteInColumn from '@/components/DeleteInColumn';
import { IAffiliate } from '@/interfaces/IAffiliate';
import { clienteService } from '@/services/clients.service';

type ClienteColumnProps = (
  fetchData: () => void,
  userPermissions: string[]
) => (ColumnGroupType<any> | ColumnType<any>)[];

export const ClienteColumn: ClienteColumnProps = (fetchData, userPermissions) => {
  return [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
    },
    {
      title: 'Telefone',
      dataIndex: 'telefone',
      key: 'telefone',
    },
    {
      title: 'Data de cadastro',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (created_at: string) => dayjs(created_at).format('DD/MM/YYYY'),
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (_, record: IAffiliate) => (
        <div className="flex justify-around">
          {userPermissions.includes('afiliados_visualizar') && (
            <Tooltip title="Editar">
              <Link href={`/dashboard/configuracoes/clientes/${record.id}/editar`}>
                <CiEdit size={20} />
              </Link>
            </Tooltip>
          )}
          {userPermissions.includes('afiliados_deletar') && (
            <DeleteInColumn
              id={record.id}
              service={clienteService}
              refresh={fetchData}
              title="Deseja deletar esse afiliado?"
              successMessage="Afiliado deletado com sucesso!"
              errorMessage="Erro ao deletar afiliado"
            />
          )}
        </div>
      ),
    },
  ];
};
