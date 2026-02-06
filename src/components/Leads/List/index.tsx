'use client';

import PageTitle from '@/components/MiniComponents/PageTitle';

import { Button, Input, Table } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { UserColumn } from './column'; // Assuming CourseColumn is meant to be UserColumn
import { useUsers } from '@/hooks/useUsers';
import PageSizeSelector from '@/components/MiniComponents/PageSizeSelector';
import { useDebounce } from '@/hooks/useDebounce';
import { Constants } from '@/components/constants';
import { useAuth } from '@/contexts/AuthContext';
import AccessDenied from '@/app/access-denied';

const LeadList: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(Constants.per_page);
  const [selectedField, setSelectedField] = useState<string>('first_name');
  const [filters, setFilters] = useState<object>({});
  const debouncedFilter = useDebounce(filters, 2000);
  const { user, permissions } = useAuth();

  const filterOptions = useMemo(() => [
    { value: 'name', label: 'Nome' }, // Changed label to 'Nome' for User list
    { value: 'email', label: 'Email' }, // Added email as a filter option
    { value: 'cpf', label: 'CPF' }, // Added CPF as a filter option
  ], []);

  if (!permissions.includes('usuarios_colaborador')) return AccessDenied();

  const { users, usersLoading, usersTotal, usersRefresh } = useUsers(
    useMemo(
      () => ({
        page,
        limit: pageSize,
        filters: { ...debouncedFilter, tipo_usuario: 'lead' },
      }),
      [page, debouncedFilter, pageSize]
    )
  );

  return (
    <div className="w-7xl container mx-auto">
      <PageTitle
        navTitle="Sistema"
        title="Leads"
        hasBackButton={true}
        
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
          columns={UserColumn(usersRefresh, permissions)}
          dataSource={users}
          loading={usersLoading}
          pagination={{
            current: page,
            pageSize: pageSize,
            total: usersTotal,
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

export default React.memo(LeadList);
