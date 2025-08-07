// components/ActionColumn.tsx
'use client';
import React from 'react';
import { Tooltip } from 'antd';
import Link from 'next/link';
import { CiEdit } from 'react-icons/ci';
import DeleteInColumn from '@/components/DeleteInColumn';

interface ActionColumnProps {
  id: string;
  editUrl?: string;
  permissions: string[];
  requiredEditPermission?: string;
  requiredDeletePermission?: string;
  service: any;
  refresh: () => void;
  deleteTitle?: string;
  deleteSuccess?: string;
  deleteError?: string;
}

const ActionColumn: React.FC<ActionColumnProps> = ({
  id,
  editUrl,
  permissions,
  requiredEditPermission = 'produtos_editar',
  requiredDeletePermission = 'produtos_deletar',
  service,
  refresh,
  deleteTitle = 'Deseja deletar este item?',
  deleteSuccess = 'Item deletado com sucesso!',
  deleteError = 'Erro ao deletar item',
}) => {
  return (
    <div className="flex justify-around">
      {permissions.includes(requiredEditPermission) && editUrl && (
        <Tooltip title="Editar">
          <Link href={editUrl}>
            <CiEdit size={20} />
          </Link>
        </Tooltip>
      )}
      {permissions.includes(requiredDeletePermission) && (
        <DeleteInColumn
          id={id}
          service={service}
          refresh={refresh}
          title={deleteTitle}
          successMessage={deleteSuccess}
          errorMessage={deleteError}
        />
      )}
    </div>
  );
};

export default React.memo(ActionColumn);
