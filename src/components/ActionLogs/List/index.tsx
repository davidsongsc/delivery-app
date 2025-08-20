'use client';

import PageTitle from '@/components/MiniComponents/PageTitle';
import { Button, Table, Popover } from 'antd'; // Importe o Popover
import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import PageSizeSelector from '@/components/MiniComponents/PageSizeSelector';
import { useDebounce } from '@/hooks/useDebounce';
import { Constants } from '@/components/constants';
import { useAuth } from '@/contexts/AuthContext';
import getUserPermissions from '@/utils/permissions';
import NotFound from '@/app/not-found';
import { ActionLogColumn } from './column';
import { useActionLogs } from '@/hooks/useActionLogs';
import { ChangeDetails } from '@/components/ChangeDetails';
import { IActionLog } from '@/interfaces/IActionLogs';

const ActionLogsList: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(Constants.per_page);
  const [selectedField, setSelectedField] = useState<string>('first_name');
  const [filters, setFilters] = useState<object>({});
  const debouncedFilter = useDebounce(filters, 2000);
  const { user, permissions } = useAuth();

  const [popoverVisible, setPopoverVisible] = useState(false);
  const [popoverRecord, setPopoverRecord] = useState<IActionLog | null>(null);
  const [popoverPosition, setPopoverPosition] = useState<{ x: number; y: number } | null>(null);

  const filterOptions = useMemo(() => [
    { value: 'name', label: 'Nome' },
    { value: 'email', label: 'Email' },
    { value: 'cpf', label: 'CPF' },
  ], []);

  if (!permissions.includes('logs_acesso')) return NotFound();

  const { actionLogs, actionLogsLoading, actionLogsTotal, actionLogsRefresh } = useActionLogs(
    useMemo(
      () => ({
        page,
        limit: pageSize,
        filters: { ...debouncedFilter, tenant: user?.tenant },
      }),
      [page, debouncedFilter, pageSize, user]
    )
  );

  const columns = useMemo(() => {
    return ActionLogColumn(actionLogsRefresh, permissions);
  }, [actionLogsRefresh, permissions]);

  const handleRowClick = (record: IActionLog, event: React.MouseEvent) => ({
    onClick: (e: React.MouseEvent) => {
      if (popoverRecord?.id === record.id && popoverVisible) {
        setPopoverVisible(false);
        setPopoverRecord(null);
      } else {
        setPopoverRecord(record);
        setPopoverVisible(true);
        setPopoverPosition({ x: event.clientX, y: event.clientY });
      }
    },
  });

  const handlePopoverClose = () => {
    setPopoverVisible(false);
    setPopoverRecord(null);
  };

  return (
    <div className="w-7xl container mx-auto">
      <PageTitle
        navTitle="Sistema >"
        title="Logs de Ações"
        hasBackButton={true}
        action={
          <>
            {permissions.includes('produtos_criar') && (
              <Link href="/dashboard/configuracoes/produtos/cadastrar">
                <Button
                  type="default"
                  size="large"
                  className="w-full sm:w-auto px-6 py-3 font-semibold text-base rounded-md shadow-md hover:shadow-lg transition-shadow"
                >
                  Adicionar Produto
                </Button>
              </Link>
            )}
          </>
        }
      />
      <div className="bg-secondary rounded-lg shadow-xl relative">
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
          columns={columns}
          dataSource={actionLogs}
          loading={actionLogsLoading}
          expandable={{
            expandedRowRender: (record) => (
              <div className="">
                <ChangeDetails record={record} />
              </div>
            ),
            rowExpandable: () => true,
            expandRowByClick: true,
          }}
          pagination={{
            current: page,
            pageSize: pageSize,
            total: actionLogsTotal,
            onChange: (page) => setPage(page),
            showSizeChanger: false,
            className: 'mt-4 ant-pagination-dark',
          }}
          className="ant-table-dark mt-4"
        />
      </div>
      {popoverVisible && popoverRecord && (
        <Popover
          content={<ChangeDetails record={popoverRecord} />}
          open={popoverVisible}
          onOpenChange={handlePopoverClose} // Use onOpenChange para fechar
          overlayInnerStyle={{ padding: 0 }}
          placement="right"
          trigger="click"
          overlayClassName="action-log-popover"
          overlayStyle={{ top: popoverPosition?.y, left: popoverPosition?.x }}
          getPopupContainer={() => document.body}

        >
          <div />
        </Popover>
      )}
    </div>
  );
};

export default React.memo(ActionLogsList);