'use client';

import PageTitle from '@/components/MiniComponents/PageTitle';

import { Button, Input, Table } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ProfileColumn } from './column'; 
import PageSizeSelector from '@/components/MiniComponents/PageSizeSelector';
import { useDebounce } from '@/hooks/useDebounce';
import { Constants } from '@/components/constants';
import { useAuth } from '@/contexts/AuthContext';
import getUserPermissions from '@/utils/permissions';
import NotFound from '@/app/not-found';
import { useProfiles } from '@/hooks/useProfiles';

const ProfileList: React.FC = () => {
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

  if (!permissions.includes('permissoes_visualizar')) return NotFound();

  const { profiles, profilesLoading, profilesTotal, profilesRefresh } = useProfiles(
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
    <div className="w-7xl container mx-auto">
      <PageTitle
        navTitle="Sistema >"
        title="Permissões" // Corrected typo for consistency
        hasBackButton={true} // Added a back button, assuming it's a common navigation pattern
        action={
          <>
            {permissions.includes('permissoes_criar') && (
              <Link href="/dashboard/configuracoes/usuarios/cadastrar">
                {/* Styled button to match the new PageTitle aesthetic */}
                <Button
                  type="default"
                  size="large"
                  className="w-full sm:w-auto px-6 py-3 font-semibold text-base rounded-md shadow-md hover:shadow-lg transition-shadow"
                >
                  Adicionar Permissões
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
          columns={ProfileColumn(profilesRefresh, permissions)} // Remember to ensure CourseColumn correctly handles user data
          dataSource={profiles}
          loading={profilesLoading}
          pagination={{
            current: page,
            pageSize: pageSize,
            total: profilesTotal,
            onChange: (page) => setPage(page),
            showSizeChanger: false,
            // Styling for Ant Design pagination (optional, but can enhance consistency)
            className: 'mt-4 ant-pagination-dark',
          }}
          className="ant-table-dark my-4 "
        />
      </div>
    </div>
  );
};

export default React.memo(ProfileList);