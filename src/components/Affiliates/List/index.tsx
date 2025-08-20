'use client';

import PageTitle from '@/components/MiniComponents/PageTitle';

import { Button, Input, Table } from 'antd/es/index';
import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { AffiliateColumn } from './column'; 
import PageSizeSelector from '@/components/MiniComponents/PageSizeSelector';
import { useDebounce } from '@/hooks/useDebounce';
import { Constants } from '@/components/constants';
import { useAuth } from '@/contexts/AuthContext';
import NotFound from '@/app/not-found';
import { userAffiliaties } from '@/hooks/useAffiliaties';
import AccessDenied from '@/app/access-denied';

const AffiliatesList: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(Constants.per_page);
  const [selectedField, setSelectedField] = useState<string>('first_name');
  const [filters, setFilters] = useState<object>({});
  const debouncedFilter = useDebounce(filters, 2000);
  const { user, permissions } = useAuth();
  
  const filterOptions = useMemo(() => [
    { value: 'name', label: 'Nome' }, 
    { value: 'email', label: 'Email' }, 
    { value: 'cpf', label: 'CPF' }, 
  ], []);

  if (!permissions.includes('afiliados_acesso_visualizar')) return AccessDenied();

  const { affiliaties, affiliatiesLoading, affiliatiesTotal, affiliatiesRefresh } = userAffiliaties(
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
    <div className="w-7xl container mx-auto">
      <PageTitle
        navTitle="Sistema"
        title="Afiliados"
        hasBackButton={true} 
        action={
          <>
            {permissions.includes('afiliados_acesso_criar') && (
              <Link href="/dashboard/configuracoes/afiliados/cadastrar">
                <Button
                  type="default"
                  size="large"
                  className="w-full sm:w-auto px-6 py-3 font-semibold text-base rounded-md shadow-md hover:shadow-lg transition-shadow"
                >
                  Adicionar Usuário
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
          columns={AffiliateColumn(affiliatiesRefresh, permissions)}
          dataSource={affiliaties}
          loading={affiliatiesLoading}
          pagination={{
            current: page,
            pageSize: pageSize,
            total: affiliatiesTotal,
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

export default React.memo(AffiliatesList);
