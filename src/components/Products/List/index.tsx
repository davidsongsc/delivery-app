'use client';

import PageTitle from '@/components/MiniComponents/PageTitle';

import { Button, Input, Table } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ProductColumn } from './column'; // Assuming CourseColumn is meant to be UserColumn
import PageSizeSelector from '@/components/MiniComponents/PageSizeSelector';
import { useDebounce } from '@/hooks/useDebounce';
import { Constants } from '@/components/constants';
import { useAuth } from '@/contexts/AuthContext';
import NotFound from '@/app/not-found';
import { useProdutos } from '@/hooks/useProducts';
import { useRouter } from 'next/navigation';
const ProductList: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(Constants.per_page);
  const [selectedField, setSelectedField] = useState<string>('first_name');
  const [filters, setFilters] = useState<object>({});
  const debouncedFilter = useDebounce(filters, 2000);
  const { user, permissions } = useAuth();
  const router = useRouter();
  console.log('permissions', permissions);
  const filterOptions = useMemo(() => [
    { value: 'name', label: 'Nome' }, // Changed label to 'Nome' for User list
    { value: 'email', label: 'Email' }, // Added email as a filter option
    { value: 'cpf', label: 'CPF' }, // Added CPF as a filter option
  ], []);

  if (!permissions.includes('produtos')) return NotFound();

  const { produtos, produtosLoading, produtosTotal, produtosRefresh } = useProdutos(
    useMemo(
      () => ({
        page,
        limit: pageSize,
        filters: { ...debouncedFilter, tenant: user?.tenant },
      }),
      [page, debouncedFilter, pageSize, user]
    )
  );

  return (
    // Added some padding for the overall container for better spacing
    <div className="w-7xl container mx-auto">
      <PageTitle
        navTitle="Sistema >"
        title="Produtos"
        hasBackButton={true}
        action={
          <>
            {permissions.includes('produtos_criar') && (
              <Link href="/dashboard/configuracoes/produtos/cadastrar">
                {/* Styled button to match the new PageTitle aesthetic */}
                <Button
                  type="default"
                  size="large"
                  className="w-full sm:w-auto px-6 py-3 font-semibold text-base rounded-md shadow-md hover:shadow-lg transition-shadow"
                >
                  Adicionar Produto
                </Button>
              </Link>
            )}</>

        }
      />

      <div className="bg-secondary  rounded-lg shadow-xl">
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
            pageSize: pageSize,
            total: produtosTotal,
            onChange: (page) => setPage(page),
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
