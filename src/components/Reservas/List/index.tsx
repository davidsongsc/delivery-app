'use client';

import PageTitle from '@/components/MiniComponents/PageTitle';

import { Button, Input, Table } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ClienteColumn } from './column'; // Assuming CourseColumn is meant to be UserColumn
import PageSizeSelector from '@/components/MiniComponents/PageSizeSelector';
import { useDebounce } from '@/hooks/useDebounce';
import { Constants } from '@/components/constants';
import { useAuth } from '@/contexts/AuthContext';
import getUserPermissions from '@/utils/permissions';
import NotFound from '@/app/not-found';
import { userAffiliaties } from '@/hooks/useAffiliaties';
import { userClientes } from '@/hooks/useClients';
import { useReservas } from '@/hooks/useReservas';

const ReservasList: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(Constants.per_page);
  const [selectedField, setSelectedField] = useState<string>('first_name');
  const [filters, setFilters] = useState<object>({});
  const debouncedFilter = useDebounce(filters, 2000);
  const { user } = useAuth();
  const permissions = getUserPermissions(user);

  const filterOptions = useMemo(() => [
    { value: 'name', label: 'Nome' }, // Changed label to 'Nome' for User list
    { value: 'email', label: 'Email' }, // Added email as a filter option
    { value: 'cpf', label: 'CPF' }, // Added CPF as a filter option
  ], []);

  if (!permissions.includes('afiliados_acesso_visualizar')) return NotFound();

  const { reservas, reservasLoading, reservasTotal, reservasRefresh } = useReservas(
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
        navTitle="Sistema > Publico"
        title="Reservas"
        hasBackButton={true}
        action={
          <>
            {permissions.includes('afiliados_acesso_criar') && (
              <Link href="/dashboard/reservas/cadastrar">
                {/* Styled button to match the new PageTitle aesthetic */}
                <Button
                  type="default"
                  size="large"
                  className="w-full sm:w-auto px-6 py-3 font-semibold text-base rounded-md shadow-md hover:shadow-lg transition-shadow"
                >
                  Adicionar Reserva
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
          columns={ClienteColumn(reservasRefresh, permissions)}
          dataSource={reservas}
          loading={reservasLoading}
          pagination={{
            current: page,
            pageSize: pageSize,
            total: reservasTotal,
            onChange: (page) => setPage(page),
            showSizeChanger: false,
            // Styling for Ant Design pagination (optional, but can enhance consistency)
            className: 'mt-4 ant-pagination-dark',
          }}
          // Applied a dark theme to the table for better integration with the overall design
          className="ant-table-dark mt-4"
        />
      </div>
    </div>
  );
};

export default React.memo(ReservasList);
