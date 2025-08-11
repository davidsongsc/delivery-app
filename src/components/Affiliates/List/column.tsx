import { Tag, Tooltip } from 'antd';
import { ColumnGroupType } from 'antd/es/table';
import { ColumnType } from 'antd/lib/table';
import dayjs from 'dayjs';
import Link from 'next/link';
import React from 'react';
import { CiEdit } from 'react-icons/ci';

import DeleteInColumn from '@/components/DeleteInColumn';
import { IAffiliate } from '@/interfaces/IAffiliate';
import { affiliateService } from '@/services/affiliate.service';

type AffiliateColumnProps = (
  fetchData: () => void,
  userPermissions: string[]
) => (ColumnGroupType<any> | ColumnType<any>)[];

export const AffiliateColumn: AffiliateColumnProps = (fetchData, userPermissions) => {
  return [
    {
      title: 'Código',
      dataIndex: 'codigo_afiliado',
      key: 'codigo_afiliado',
    },
    {
      title: 'Nome',
      key: 'nome',
      render: (_, record: IAffiliate & { user_info?: any }) =>
        record.user_info
          ? `${record.user_info.first_name} ${record.user_info.last_name}`
          : '-',
    },
    {
      title: 'Email',
      key: 'email',
      render: (_, record: IAffiliate & { user_info?: any }) =>
        record.user_info?.email ?? '-',
    },
    {
      title: 'Empresa',
      key: 'empresa',
      render: (_, record: IAffiliate & { corporation_info?: any }) =>
        record.corporation_info?.nome ?? '-',
    },
    {
      title: 'Comissão (%)',
      dataIndex: 'comissao_percentual',
      key: 'comissao_percentual',
    },
    {
      title: 'Ativo',
      dataIndex: 'ativo',
      key: 'ativo',
      render: (value: boolean) => (value ? 'Sim' : 'Não'),
    },
    {
      title: 'Criado em',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (value: string) => dayjs(value).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (_, record: IAffiliate) => (
        <div className="flex justify-around">
          {userPermissions.includes('afiliados_visualizar') && (
            <Tooltip title="Editar">
              <Link href={`/dashboard/afiliados/${record.id}/editar`}>
                <CiEdit size={20} />
              </Link>
            </Tooltip>
          )}
          {userPermissions.includes('afiliados_deletar') && (
            <DeleteInColumn
              id={record.id}
              service={affiliateService}
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
