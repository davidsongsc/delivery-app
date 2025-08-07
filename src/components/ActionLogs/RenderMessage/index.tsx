// components/ChangeDetailsPopover.tsx
import { IActionLog } from "@/interfaces/IActionLogs";
import { Popover, Tag, Timeline } from "antd"; 
import { EditOutlined, PlusOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';
import React from "react";

// Funções utilitárias mantidas (getChangeIcon, formatValue)
const getChangeIcon = (actionType: string) => {
  switch (actionType) {
    case 'CREATE':
      return <PlusOutlined style={{ color: '#52c41a' }} />;
    case 'UPDATE':
      return <EditOutlined style={{ color: '#1890ff' }} />;
    case 'DELETE':
      return <DeleteOutlined style={{ color: '#f5222d' }} />;
    default:
      return null;
  }
};

const formatValue = (value: any) => {
  if (value === null) {
    return <span style={{ color: '#aaa' }}>null</span>;
  }
  if (typeof value === 'boolean') {
    return <span style={{ color: value ? '#52c41a' : '#f5222d' }}>{value.toString()}</span>;
  }
  return <span style={{ color: '#fff' }}>"{String(value)}"</span>;
};

interface ChangeDetailsProps {
  record: IActionLog;
}

const ChangeDetails: React.FC<ChangeDetailsProps> = ({ record }) => {
  const changes: { key: string; prev: any; new: any }[] = [];

  if (record.dados_anteriores && record.dados_novos) {
    const allKeys = new Set([...Object.keys(record.dados_anteriores), ...Object.keys(record.dados_novos)]);
    for (const key of allKeys) {
      const prevValue = record.dados_anteriores[key];
      const newValue = record.dados_novos[key];

      if (JSON.stringify(prevValue) === JSON.stringify(newValue)) {
        continue;
      }

      if (key === 'flags' && prevValue && newValue) {
        for (const flagKey in newValue) {
          if (newValue[flagKey] !== prevValue[flagKey]) {
            changes.push({
              key: `flags.${flagKey}`,
              prev: prevValue[flagKey],
              new: newValue[flagKey],
            });
          }
        }
      } else if (key === 'categoria' && prevValue && newValue) {
        if (prevValue.nome !== newValue.nome) {
          changes.push({
            key: 'categoria.nome',
            prev: prevValue.nome,
            new: newValue.nome,
          });
        }
      } else {
        changes.push({
          key,
          prev: prevValue,
          new: newValue,
        });
      }
    }
  }

  const hasChanges = changes.length > 0;
  
  return (
    <div style={{ maxWidth: 400, backgroundColor: '#2d2d2d', color: '#fff', padding: 16, borderRadius: 8, fontFamily: 'monospace' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
        <UserOutlined style={{ color: '#1890ff', fontSize: 18, marginRight: 8 }} />
        <span style={{ fontWeight: 'bold' }}>{record.usuario || '—'}</span>
        <span style={{ color: '#aaa', marginLeft: 8 }}>realizou a ação</span>
      </div>
      <p style={{ margin: 0, paddingLeft: 26, color: '#fff' }}>{record.mensagem || '—'}</p>
      
      {hasChanges && (
        <div style={{ marginTop: 16 }}>
          <h5 style={{ margin: '0 0 8px', color: '#66ff66' }}>Ações:</h5>
          <div style={{ maxHeight: 200, overflowY: 'auto' }}>
            {changes.map((change) => (
              <p key={change.key} style={{ margin: '4px 0', fontSize: 12 }}>
                <span style={{ color: '#ff6666' }}>- {change.key}:</span> de {formatValue(change.prev)}
                <br />
                <span style={{ color: '#66ff66' }}>+ {change.key}:</span> para {formatValue(change.new)}
              </p>
            ))}
          </div>
        </div>
      )}
      {!hasChanges && (
        <p style={{ marginTop: 16, color: '#aaa', fontSize: 12 }}>Nenhuma alteração detalhada encontrada.</p>
      )}
    </div>
  );
};

export const renderMessage = (_: any, record: IActionLog) => {
  return (
    <Popover 
      content={<ChangeDetails record={record} />}
      title={null} 
      trigger="hover"
      placement="right"
      overlayInnerStyle={{ padding: 0 }} // Removendo o padding interno para controle total do estilo
    >
      <span>{record.mensagem || '—'}</span>
    </Popover>
  );
};