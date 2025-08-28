'use client';

import PageTitle from '@/components/MiniComponents/PageTitle';
import { Button, Table } from 'antd';
import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { ProductColumn } from './column';
import PageSizeSelector from '@/components/MiniComponents/PageSizeSelector';
import { useDebounce } from '@/hooks/useDebounce';
import { Constants } from '@/components/constants';
import { useAuth } from '@/contexts/AuthContext';
import NotFound from '@/app/not-found';
import { useProdutos } from '@/hooks/useProducts';
import { useRouter } from 'next/navigation';
import AppLoading from '@/components/AppLoading';

const ProductList: React.FC = () => {
  const { user, permissions = [], hydrated } = useAuth();
  const router = useRouter();

  // espera hidratação
  if (!hydrated || !user) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <AppLoading />
      </div>
    );
  }

  if (!permissions.includes('produtos')) return <NotFound />;

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(Constants.per_page);
  const [selectedField, setSelectedField] = useState('nome_interno');
  const [filters, setFilters] = useState({});
  const debouncedFilter = useDebounce(filters, 2000);

  const filterOptions = useMemo(() => [
    { value: 'nome', label: 'Nome' },
    { value: 'nome_interno', label: 'Nome Interno' },
    { value: 'descricao', label: 'Descrição' },
    { value: 'categoria__nome', label: 'Categoria' },
    { value: 'codigo_barras', label: 'Código de Barras' },
  ], []);

  const produtosParams = useMemo(() => ({
    page,
    limit: pageSize,
    filters: { ...(debouncedFilter || {}), tenant: user?.tenant || '' },
  }), [page, pageSize, debouncedFilter, user?.tenant]);

  const { produtos = [], produtosLoading, produtosTotal = 0, produtosRefresh } = useProdutos(produtosParams);

  return (
    <div className="w-7xl container mx-auto">
      <PageTitle
        navTitle="Sistema >"
        title="Produtos"
        hasBackButton
        action={
          permissions.includes('produtos_criar') && (
            <Link href="/dashboard/configuracoes/produtos/cadastrar">
              <Button
                type="default"
                size="large"
                className="w-full sm:w-auto px-6 py-3 font-semibold text-base rounded-md shadow-md hover:shadow-lg transition-shadow"
              >
                Adicionar Produto
              </Button>
            </Link>
          )
        }
      />

      <div className="bg-secondary rounded-lg shadow-xl">
        <PageSizeSelector
          pageSize={pageSize}
          setPageSize={setPageSize}
          setPage={setPage}
          filters={filters}
          setFilters={setFilters}
          selectedField={selectedField}
          setSelectedField={setSelectedField}
          filterOptions={filterOptions}
        />

        <Table
          rowKey="id"
          columns={ProductColumn(produtosRefresh, permissions)}
          dataSource={produtos}
          loading={produtosLoading}
          onRow={(record) => ({
            onClick: () => {
              if (permissions.includes('produtos_visualizar')) {
                router.push(`/dashboard/configuracoes/produtos/${record.id}/editar`);
              }
            },
          })}
          pagination={{
            current: page,
            pageSize,
            total: produtosTotal,
            onChange: (p) => setPage(p),
            showSizeChanger: false,
            className: 'mt-4 ant-pagination-dark',
          }}
          className="ant-table-dark mt-4"
        />
      </div>
    </div>
  );
};

export default React.memo(ProductList);
