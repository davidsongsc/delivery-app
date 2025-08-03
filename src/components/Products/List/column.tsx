import DeleteInColumn from '@/components/DeleteInColumn';
import { Tag, Tooltip } from 'antd';
import { ColumnGroupType, ColumnType } from 'antd/es/table';
import dayjs from 'dayjs';
import Link from 'next/link';
import React from 'react';
import { CiEdit } from 'react-icons/ci';

import { IProduto } from '@/interfaces/IProduto';
import { produtosService } from '@/services/product.service';

type ProductColumnProps = (
  fetchData: () => void,
  productPermissions: string[]
) => (ColumnGroupType<IProduto> | ColumnType<IProduto>)[];

export const ProductColumn: ProductColumnProps = (fetchData, productPermissions) => {
  return [
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
      render: (value: string) => <strong>{value}</strong>,
    },
    {
      title: 'Categoria',
      dataIndex: 'categoria',
      key: 'categoria',
    },
    {
      title: 'Descrição',
      dataIndex: 'descricao',
      key: 'descricao',
      ellipsis: true,
      render: (value: string) => (
        <Tooltip title={value}>
          <span>{value.length > 50 ? `${value.slice(0, 50)}...` : value}</span>
        </Tooltip>
      ),
    },
    {
      title: 'Preço',
      dataIndex: 'valor',
      key: 'valor',
      render: (value: number | undefined) =>
        value != null ? `R$ ${value.toFixed(2)}` : '-',
    },
    {
      title: 'Desconto',
      dataIndex: 'desconto',
      key: 'desconto',
      render: (value: number) => value > 0 ? `R$ ${value.toFixed(2)}` : '-',
    },
    {
      title: 'Promocional',
      dataIndex: 'promocional',
      key: 'promocional',
      render: (value: boolean) => (
        <Tag color={value ? 'gold' : 'default'}>
          {value ? 'Sim' : 'Não'}
        </Tag>
      ),
    },
    {
      title: 'Quantidade',
      dataIndex: 'quantidade',
      key: 'quantidade',
      render: (value: number) => <Tag color="blue">{value}</Tag>,
    },
    {
      title: 'Adicionais',
      key: 'adicionar',
      render: (_: any, record: IProduto) => {
        const { adicionar } = record;
        if (!adicionar || adicionar.length === 0) return '-';
        return (
          <Tooltip
            title={
              <ul className="list-disc pl-5">
                {adicionar.map((item, idx) => (
                  <li key={idx}>
                    {item.item}: R$ {item.valor.toFixed(2)}
                  </li>
                ))}
              </ul>
            }
          >
            <Tag color="green">{adicionar.length} item(s)</Tag>
          </Tooltip>
        );
      },
    },
    {
      title: 'Removíveis',
      dataIndex: 'remover',
      key: 'remover',
      render: (value: string[]) =>
        value && value.length > 0 ? (
          <Tooltip
            title={
              <ul className="list-disc pl-5">
                {value.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            }
          >
            <Tag color="red">{value.length} opção(ões)</Tag>
          </Tooltip>
        ) : (
          '-'
        ),
    },
    {
      title: 'Composição',
      dataIndex: 'composicao',
      key: 'composicao',
      render: (value: string[] | undefined) =>
        value && value.length > 0 ? (
          <Tooltip
            title={
              <ul className="list-disc pl-5">
                {value.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            }
          >
            <Tag color="purple">{value.length} item(s)</Tag>
          </Tooltip>
        ) : (
          '-'
        ),
    },
    {
      title: 'Imagem',
      dataIndex: 'imagem',
      key: 'imagem',
      render: (value: string | undefined) =>
        value ? (
          <img
            src={value}
            alt="Produto"
            style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }}
          />
        ) : (
          <span>-</span>
        ),
    },
    {
      title: 'Ações',
      key: 'actions',
      width: 120,
      render: (_: any, record: IProduto) => (
        <div className="flex justify-around">
          {productPermissions.includes('produtos_editar') && (
            <Tooltip title="Editar">
              <Link href={`/dashboard/configuracoes/produtos/${record.id}/editar`}>
                <CiEdit size={20} />
              </Link>
            </Tooltip>
          )}
          {productPermissions.includes('produtos_deletar') && (
            <DeleteInColumn
              id={record.id}
              service={produtosService}
              refresh={fetchData}
              title="Deseja deletar este produto?"
              successMessage="Produto deletado com sucesso!"
              errorMessage="Erro ao deletar produto"
            />
          )}
        </div>
      ),
    },
  ];
};