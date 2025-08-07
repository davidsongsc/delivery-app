import { Tag, Tooltip } from 'antd';
import { ColumnGroupType, ColumnType } from 'antd/es/table';
import React from 'react';
import { produtosService } from '@/services/product.service';
import ActionColumn from '@/components/MiniComponents/ActionColumn';
import { IActionLog } from '@/interfaces/IActionLogs';
import { renderMessage } from '../RenderMessage';

type ActionLogColumnProps = (
  fetchData: () => void,
  actionLogPermissions: string[]
) => (ColumnGroupType<IActionLog> | ColumnType<IActionLog>)[];



export const ActionLogColumn: ActionLogColumnProps = (fetchData, actionLogPermissions) => {
  return [
    {
      width: 80,
      title: 'Ação',
      key: 'acao',
      render: (_: any, record: IActionLog) => (
        <Tag color="blue">{record.acao}</Tag>
      ),
    },
    {
      width: 80,
      title: 'Modelo',
      key: 'content_type',
      render: (_: any, record: IActionLog) => (
        <Tag>{record.content_type?.toUpperCase?.() || '—'}</Tag>
      ),
    },
    {
      width: 350,
      title: 'Mensagem',
      key: 'mensagem',
      dataIndex: 'mensagem',
    },
    {
      title: 'Usuário',
      key: 'usuario',
      render: (_: any, record: IActionLog) => (
        <strong>{record.usuario || '—'}</strong>
      ),
    },

    {
      title: 'Empresa',
      key: 'corporation',
      render: (_: any, record: IActionLog) => (
        <span>{record.corporation || '—'}</span>
      ),
    },


    {
      title: 'IP',
      key: 'ip',
      render: (_: any, record: IActionLog) => (
        <span>{record.ip || '—'}</span>
      ),
    },
    {
      title: 'Criado em',
      key: 'criado_em',
      render: (_: any, record: IActionLog) => (
        <small>{new Date(record.criado_em).toLocaleString()}</small>
      ),
    },
    {
      title: 'Ações',
      key: 'actions',
      width: 120,
      render: (_: any, record: IActionLog) => (
        <ActionColumn
          id={record.id}
          editUrl={`/dashboard/configuracoes/produtos/${record.id}/editar`}
          permissions={actionLogPermissions}
          requiredEditPermission="produtos_editar"
          requiredDeletePermission="produtos_deletar"
          service={produtosService}
          refresh={fetchData}
          deleteTitle="Deseja deletar este produto?"
          deleteSuccess="Produto deletado com sucesso!"
          deleteError="Erro ao deletar produto"
        />
      ),
    },
  ];
};
