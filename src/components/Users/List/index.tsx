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
import getUserPermissions from '@/utils/permissions';
import NotFound from '@/app/not-found';

const UserList: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(Constants.per_page);
  const [selectedField, setSelectedField] = useState<string>('name');
  const [filters, setFilters] = useState<object>({});
  const debouncedFilter = useDebounce(filters, 2000);


  const { user } = useAuth();
  const permissions = getUserPermissions(user);

  const filterOptions = useMemo(() => [
    { value: 'name', label: 'Nome' }, // Changed label to 'Nome' for User list
    { value: 'email', label: 'Email' }, // Added email as a filter option
    { value: 'cpf', label: 'CPF' }, // Added CPF as a filter option
  ], []);

  if (!permissions.includes('pode_visualizar')) return NotFound();

  const { users, usersLoading, usersTotal, usersRefresh } = useUsers(
    useMemo(
      () => ({
        page,
        limit: pageSize,
        filters: debouncedFilter as Record<string, string>,
      }),
      [page, debouncedFilter, pageSize]
    )
  );

  return (
    // Added some padding for the overall container for better spacing
    <div className="w-7xl container mx-auto">
      <PageTitle
        navTitle="Sistema >"
        title="Usuários" // Corrected typo for consistency
        hasBackButton={true} // Added a back button, assuming it's a common navigation pattern
        action={
          <>
            {permissions.includes('usuarios_criar') && (
              <Link href="/dashboard/configuracoes/usuarios/cadastrar">
                {/* Styled button to match the new PageTitle aesthetic */}
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

      <div className="bg-secondary  rounded-lg shadow-xl"> {/* Container for table and filters */}
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

        {/* Added some top margin for the table for better spacing */}
        <Table
          rowKey="id"
          columns={UserColumn(usersRefresh, permissions)} // Remember to ensure CourseColumn correctly handles user data
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

export default React.memo(UserList);