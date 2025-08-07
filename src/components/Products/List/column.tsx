import DeleteInColumn from '@/components/DeleteInColumn';
import { Tag, Tooltip } from 'antd';
import { ColumnGroupType, ColumnType } from 'antd/es/table';
import { Popover } from 'antd';
import Link from 'next/link';
import React from 'react';
import { CiEdit } from 'react-icons/ci';

import { IProduto } from '@/interfaces/IProduto';
import { produtosService } from '@/services/product.service';
import Image from 'next/image';
import ActionColumn from '@/components/MiniComponents/ActionColumn';

type ProductColumnProps = (
  fetchData: () => void,
  productPermissions: string[]
) => (ColumnGroupType<IProduto> | ColumnType<IProduto>)[];

export const ProductColumn: ProductColumnProps = (fetchData, productPermissions) => {
  return [
    {
      width: 300,
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
      render: (value: string) => <strong>{value}</strong>,
    },
    {
      width: 150,
      title: 'Categoria',
      key: 'categoria',
      render: (_: any, record: IProduto) => {
        return <span>{record?.categoria?.nome || '-'}</span>;
      },
    },

    {
      width: 150,
      title: 'Preço',
      dataIndex: 'valor',
      key: 'valor',
      render: (value: number | undefined) =>
        value != null ? `R$ ${value.toFixed(2)}` : '-',
    },

    {
      width: 100,
      title: 'Quantidade',
      dataIndex: 'quantidade',
      key: 'quantidade',
      render: (value: number) => <Tag color="blue">{value}</Tag>,
    },

    {
      title: 'Imagens',
      key: 'imagens',
      render: (_: any, record: IProduto) => {
        if (!record.imagens || record.imagens.length === 0) return <span>-</span>;

        return (
          <Popover
            content={
              <div className="flex gap-2 flex-wrap max-w-[300px]">
                {record.imagens.map((img) => (
                  <Image
                    key={img.id}
                    src={img.imagem}
                    alt="Produto"
                    width={60}
                    height={60}
                    style={{ objectFit: 'cover', borderRadius: 4 }}
                  />
                ))}
              </div>
            }
            title="Imagens"
          >
            <Image
              src={record.imagens[0].imagem}
              alt="Produto"
              width={50}
              height={50}
              style={{ objectFit: 'cover', borderRadius: 4 }}
            />
          </Popover>
        );
      },
    },

    {
      title: 'Ações',
      key: 'actions',
      width: 120,
      render: (_: any, record: IProduto) => (
        <ActionColumn
          id={record.id}
          editUrl={`/dashboard/configuracoes/produtos/${record.id}/editar`}
          permissions={productPermissions}
          requiredEditPermission="produtos_editar"
          requiredDeletePermission="produtos_deletar"
          service={produtosService}
          refresh={fetchData}
          deleteTitle="Deseja deletar este produto?"
          deleteSuccess="Produto deletado com sucesso!"
          deleteError="Erro ao deletar produto"
        />
      ),
    },

  ];
};