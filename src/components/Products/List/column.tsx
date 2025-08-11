import DeleteInColumn from '@/components/DeleteInColumn';
import { Tag, Tooltip } from 'antd';
import { ColumnGroupType, ColumnType } from 'antd/es/table';
import { Popover } from 'antd';
import React from 'react';

import { IProduto } from '@/interfaces/IProduto';
import Image from 'next/image';
import Quantidade from '@/components/MiniComponents/Quantidade';
import NomeProduto from '@/components/MiniComponents/NomeProduto';

type ProductColumnProps = (
  fetchData: () => void,
  productPermissions: string[]
) => (ColumnGroupType<IProduto> | ColumnType<IProduto>)[];

export const ProductColumn: ProductColumnProps = (fetchData, productPermissions) => {
  return [
    {
      width: 80,
      title: 'Categoria',
      key: 'categoria',
      render: (_: any, record: IProduto) => {
        return <span className='text-xl font-bold flex items-center w-full uppercase'>{record?.categoria?.nome || '-'}</span>;
      },
    },
    {
      width: 250,
      title: <div className='flex items-center justify-between'>
        <span>Nome</span>
        <span className='text-sm text-gray-500 mr-2'>Quantidade</span>
      </div>,
      dataIndex: 'nome',
      key: 'nome',
      render: (_: any, record: { nome: string; nome_interno?: string; estoque: number }) => (
        <div className='flex items-center justify-between'>
          <NomeProduto nome={record.nome} nome_interno={record.nome_interno} />
          <Quantidade valor={record.estoque} key={record.estoque} />
        </div>
      ),
    },


    {
      width: 300,
      title: 'Descrição',
      dataIndex: 'descricao',
      key: 'descricao',
      render: (value: string | undefined) => {
        return <span>{value || '-'}</span>;
      }
    },



    {
      width: 110,
      title: 'Status',
      dataIndex: 'ativo',
      key: 'ativo',
      render: (value: number | undefined) => {
        const tagStyle = {
          fontFamily: '"Inter", sans-serif',
          fontWeight: 600,
          fontSize: 14,
          padding: '0 10px',
          height: 28,
          lineHeight: '26px',
          textAlign: 'center' as const,
        };

        return value ? (
          <Tag color="#52c41a" style={tagStyle}>Disponível</Tag>
        ) : (
          <Tag color="#ff4d4f" style={tagStyle}>Indisponível</Tag>
        );
      },
    },


    {
      width: 110,
      title: 'Preço',
      dataIndex: 'preco',
      key: 'preco',
      render: (value: number | undefined) => (
        <div
          className='text-xl font-bold flex items-center w-full'
        >
          {value != null ? `R$ ${value}` : '-'}
        </div>
      ),
    },
    {
      width: 40,
      title: 'Imagens',
      key: 'imagens',
      render: (_: any, record: IProduto) => {
        if (!record.imagens || record.imagens.length === 0) return <span>-</span>;

        return (
          <Popover
            content={
              <div className="flex  flex-wrap max-w-[600px]">
                {record.imagens.map((img) => (
                  <Image
                    key={img.id}
                    src={img.imagem_url}
                    alt="Produto"
                    width={100}
                    height={100}
                    className="rounded-lg object-cover m-2 cursor-pointer"
                    style={{
                      aspectRatio: '1 / 1',
                    }}
                  />
                ))}
              </div>
            }

          >
            <div className='grid grid-cols-3 gap-2'>
              {record.imagens.slice(0, 3).map((img) => (
                <Image
                  key={img.id}
                  src={img.imagem_url}
                  alt="Produto"
                  width={150}
                  height={150}
                  className="rounded-lg object-cover cursor-pointer"
                  style={{
                    aspectRatio: '1 / 1',
                  }}
                />
              ))}
            </div>


          </Popover>
        );
      },
    },


    /*
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
*/
  ];
};