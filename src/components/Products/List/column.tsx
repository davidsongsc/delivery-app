import { Tag, Grid } from 'antd';
import { ColumnGroupType, ColumnType } from 'antd/es/table';
import { Popover } from 'antd';
import React from 'react';
import DOMPurify from "dompurify";
import { IProduto } from '@/interfaces/IProduto';
import Image from 'next/image';
import Quantidade from '@/components/MiniComponents/Quantidade';
import NomeProduto from '@/components/MiniComponents/NomeProduto';
import truncate from "html-truncate";

const { useBreakpoint } = Grid;

type ProductColumnProps = (
  fetchData: () => void,
  productPermissions: string[]
) => (ColumnGroupType<IProduto> | ColumnType<IProduto>)[];

export const ProductColumn: ProductColumnProps = (fetchData, productPermissions) => {
  const screens = useBreakpoint();
  const isXlOrLarger = screens.xl;
  const isLgOrLarger = screens.lg;
  const isMdOrLarger = screens.md;
  const isSmOrLarger = screens.sm;



  const tagStyle = {
    fontFamily: '"Inter", sans-serif',
    fontWeight: 600,
    fontSize: 14,
    padding: '0 10px',
    height: 28,
    lineHeight: '26px',
    textAlign: 'center' as const,
    marginRight: 4,
    marginBottom: 4,
  };

  return [
    ...(isMdOrLarger ? [
      {
        width: 80,
        title: 'Categoria',
        key: 'categoria',
        render: (_: any, record: IProduto) => (
          <span className='text-xl font-bold flex items-center w-full uppercase'>
            {record?.categoria?.nome || '-'}
          </span>
        ),
      },] : []),
    {
      width: 250,
      title: (
        <div className='flex items-center justify-between'>
          <span>Nome</span>
          <span className='text-sm text-gray-500 mr-2'>Quantidade</span>
        </div>
      ),
      dataIndex: 'nome',
      key: 'nome',
      render: (_: any, record: { nome: string; nome_interno?: string; estoque: number }) => (
        <div className='flex items-center justify-between'>
          <NomeProduto nome={record.nome} nome_interno={record.nome_interno} />
          <Quantidade valor={record.estoque} key={record.estoque} />
        </div>
      ),
    },
    // Coluna Descrição apenas para telas XL ou maiores
    ...(isXlOrLarger ? [
      {
        width: 300,
        title: 'Descrição',
        dataIndex: 'descricao',
        key: 'descricao',
        render: (value: string | undefined) => {
          if (!value) return <span>-</span>;

          const sanitizedHTML = DOMPurify.sanitize(value, {
            ALLOWED_TAGS: ['b', 'i', 's', 'u', 'em', 'strong', 'ul', 'ol', 'li', 'a', 'br'],
            ALLOWED_ATTR: ['href', 'target', 'rel']
          });

          const truncatedHTML = truncate(sanitizedHTML, 155, { ellipsis: '...' });

          return <span title={value} dangerouslySetInnerHTML={{ __html: truncatedHTML }} />;
        },
      }
    ] : []),
    ...(isSmOrLarger ? [

      {
        width: 300,
        title: 'Status',
        dataIndex: 'ativo',
        key: 'ativo',
        render: (_: any, record: IProduto) => (
          <div className="flex flex-wrap">
            <Tag color={record.ativo ? "#52c41a" : "#ff4d4f"} style={tagStyle}>
              {record.ativo ? "Disponível" : "Indisponível"}
            </Tag>
            {record.flags?.comanda && <Tag color="#1890ff" style={tagStyle}>Comanda</Tag>}
            {record.flags?.delivery && <Tag color="#fa8c16" style={tagStyle}>Delivery</Tag>}
            {record.flags?.happy_hour && <Tag color="#722ed1" style={tagStyle}>Happy Hour</Tag>}
            {record.flags?.promocional && <Tag color="#fadb14" style={{ ...tagStyle, color: '#000' }}>Promocional</Tag>}
          </div>
        ),
      },] : []),
    ...(isLgOrLarger ? [
      {
        width: 110,
        title: 'Preço',
        dataIndex: 'preco',
        key: 'preco',
        render: (value: number | undefined) => (
          <div className='text-xl font-bold flex items-center w-full'>
            {value != null ? `R$ ${value}` : '-'}
          </div>
        ),
      },] : []),
    // Coluna Imagens apenas para telas XL ou maiores
    ...(isXlOrLarger ? [
      {
        width: 40,
        title: 'Imagens',
        key: 'imagens',
        render: (_: any, record: IProduto) => {
          if (!record.imagens || record.imagens.length === 0) return <span>-</span>;

          return (
            <Popover
              content={
                <div className="flex flex-wrap max-w-[600px]">
                  {record.imagens.map(img => (
                    <Image
                      key={img.id}
                      src={img.imagem_url}
                      alt="Produto"
                      width={100}
                      height={100}
                      className="rounded-lg object-cover m-2 cursor-pointer"
                      style={{ aspectRatio: '1 / 1' }}
                    />
                  ))}
                </div>
              }
            >
              <div className='grid grid-cols-3 gap-2'>
                {record.imagens.slice(0, 3).map(img => (
                  <Image
                    key={img.id}
                    src={img.imagem_url}
                    alt="Produto"
                    width={150}
                    height={150}
                    className="rounded-lg object-cover cursor-pointer"
                    style={{ aspectRatio: '1 / 1' }}
                  />
                ))}
              </div>
            </Popover>
          );
        },
      }
    ] : []),
  ];
};
