import { IActionLog } from "@/interfaces/IActionLogs";
import { Button, message, Modal } from "antd";
import { EditOutlined, PlusOutlined, DeleteOutlined, UserOutlined, CopyOutlined } from '@ant-design/icons';
import React, { useState } from "react";

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
  if (value === null || value === undefined) return 'null';
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  return String(value);
};

const formatWhatsApp = (record: IActionLog, changes: { key: string; prev: any; new: any }[]) => {
  let text = `*Log de Ação*\n`;
  text += `*Usuário:* ${record.usuario || '—'}\n`;
  text += `*Ação:* ${record.acao || '—'}\n`;
  text += `*Mensagem:* ${record.mensagem || '—'}\n`;

  if (changes.length > 0) {
    text += `\n*Alterações Detalhadas:*\n`;
    changes.forEach(change => {
      text += `• *${change.key}:*\n`;
      text += `  - De: ${formatValue(change.prev)}\n`;
      text += `  - Para: ${formatValue(change.new)}\n`;
    });
  } else {
    text += `\n*Nenhuma alteração detalhada encontrada.*\n`;
  }

  text += `\n*Criado em:* ${new Date(record.criado_em).toLocaleString()}`;

  return text;
};

interface ChangeDetailsProps {
  record: IActionLog;
}

export const ChangeDetails: React.FC<ChangeDetailsProps> = ({ record }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formattedLog, setFormattedLog] = useState('');

  const changes: { key: string; prev: any; new: any }[] = [];

  if (record.dados_anteriores && record.dados_novos) {
    const allKeys = new Set([
      ...Object.keys(record.dados_anteriores),
      ...Object.keys(record.dados_novos)
    ]);

    for (const key of allKeys) {
      const prevValue = record.dados_anteriores[key];
      const newValue = record.dados_novos[key];

      if (JSON.stringify(prevValue) === JSON.stringify(newValue)) continue;

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

  const handleCopyAttempt = (text: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        message.success('Log copiado para a área de transferência!');
        setIsModalVisible(false);
      }).catch(() => {
        message.error('Erro ao copiar automaticamente. Por favor, copie manualmente.');
      });
    } else {
      message.error('O navegador não suporta a cópia automática.');
    }
  };

  const handlePrimaryCopy = () => {
    const logText = formatWhatsApp(record, changes);
    handleCopyAttempt(logText);
    if (!(typeof navigator !== 'undefined' && navigator.clipboard)) {
      setFormattedLog(logText);
      setIsModalVisible(true);
    }
  };

  const handleModalCopy = () => {
    handleCopyAttempt(formattedLog);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const hasChanges = changes.length > 0;

  return (
    <div className="flex justify-center items-center bg-gray-100 dark:bg-zinc-800 p-1">
      <div className="w-full p-4 grid grid-cols-6 md:grid-cols-12 gap-4">

        <div className="flex justify-between items-center  mb-4 col-span-2">
          <UserOutlined className="text-blue-500 text-xl" />
          <div className="flex flex-col items-center space-x-3">
            <span className="font-bold text-lg text-gray-900 dark:text-white">{record.usuario || '—'}</span>
            <span className="text-gray-500 dark:text-gray-400">{record.acao || '—'}</span>
          </div>

        </div>
        <div className="flex flex-col items-center justify-start space-x-3 col-span-2">
          <Button
            type="text"
            icon={<CopyOutlined className="text-gray-500 hover:text-blue-500" />}
            onClick={handlePrimaryCopy}
            title="Copiar log para a área de transferência"
          />
          <p className="text-gray-700 dark:text-gray-300 mb-4">{record.mensagem || '—'}</p>
        </div>

        {hasChanges ? (
          <div className="col-span-8">
            <h5 className="text-sm font-semibold text-green-500 mb-2">Alterações detalhadas:</h5>
            <div className="max-h-64 overflow-y-auto bg-gray-50 dark:bg-zinc-800 p-4 rounded-md">
              {changes.map(({ key, prev, new: newVal }) => (
                <div key={key} className="text-xs mb-2">
                  <p className="text-red-500 break-words">- {key}: de <span className="font-mono">{formatValue(prev)}</span></p>
                  <p className="text-green-500 break-words">+ {key}: para <span className="font-mono">{formatValue(newVal)}</span></p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="mt-4 text-sm text-gray-400">Nenhuma alteração detalhada encontrada.</p>
        )}

        <Modal
          title="Copiar Log"
          open={isModalVisible}
          onOk={handleModalClose}
          onCancel={handleModalClose}
          footer={[
            <Button key="copy-auto" onClick={handleModalCopy} icon={<CopyOutlined />}>
              Copiar Automaticamente
            </Button>,
            <Button key="close" onClick={handleModalClose}>
              Fechar
            </Button>,
          ]}
        >
          <p className="mb-2">
            Se a cópia automática falhou ou não é suportada, você pode tentar novamente ou copiar o texto abaixo manualmente.
          </p>
          <div className="bg-gray-100 dark:bg-zinc-800 p-4 rounded-md">
            <pre className="whitespace-pre-wrap font-mono text-sm select-text">
              {formattedLog}
            </pre>
          </div>
        </Modal>
      </div>
    </div>
  );
};
