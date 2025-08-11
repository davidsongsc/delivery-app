import { Tag, Tooltip } from 'antd';
import { ColumnGroupType } from 'antd/es/table';
import { ColumnType } from 'antd/lib/table';
import dayjs from 'dayjs';
import Link from 'next/link';
import React from 'react';
import { CiEdit } from 'react-icons/ci';

import DeleteInColumn from '@/components/DeleteInColumn';
import { ISupplier } from '@/interfaces/ISupplier'; // ajuste o caminho se precisar
import { supplierService } from '@/services/supplier.service'; // ajuste o caminho se precisar

type SupplierColumnProps = (
  fetchData: () => void,
  userPermissions: string[]
) => (ColumnGroupType<any> | ColumnType<any>)[];

export const SupplierColumn: SupplierColumnProps = (fetchData, userPermissions) => {
  return [
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
    },
    {
      title: 'CNPJ/CPF',
      dataIndex: 'cnpj_cpf',
      key: 'cnpj_cpf',
      render: (value: string | null) => value ?? '-',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (value: string | null) => value ?? '-',
    },
    {
      title: 'Telefone',
      dataIndex: 'telefone',
      key: 'telefone',
      render: (value: string | null) => value ?? '-',
    },
    {
      title: 'Endereço',
      dataIndex: 'endereco',
      key: 'endereco',
      render: (value: string) => value || '-',
    },
    {
      title: 'Ativo',
      dataIndex: 'ativo',
      key: 'ativo',
      render: (value: boolean) => (value ? 'Sim' : 'Não'),
    },
    {
      title: 'Empresa',
      key: 'corporation',
      render: (_, record: ISupplier & { corporation?: any }) =>
        record.corporation?.nome ?? '-',
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
      render: (_, record: ISupplier) => (
        <div className="flex justify-around">
          {userPermissions.includes('forneceores_acesso_editar') && (
            <Tooltip title="Editar">
              <Link href={`/dashboard/fornecedores/${record.id}/editar`}>
                <CiEdit size={20} />
              </Link>
            </Tooltip>
          )}
          {userPermissions.includes('forneceores_acesso_eletar') && (
            <DeleteInColumn
              id={record.id}
              service={supplierService}
              refresh={fetchData}
              title="Deseja deletar esse fornecedor?"
              successMessage="Fornecedor deletado com sucesso!"
              errorMessage="Erro ao deletar fornecedor"
            />
          )}
        </div>
      ),
    },
  ];
};
