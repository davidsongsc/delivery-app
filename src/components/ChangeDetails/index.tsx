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
  if (value === null) {
    return 'null';
  }
  if (typeof value === 'boolean') {
    return value.toString();
  }
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
      text += `   - De: ${formatValue(change.prev)}\n`;
      text += `   - Para: ${formatValue(change.new)}\n`;
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

  const handleCopyAttempt = (text: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        message.success('Log copiado para a área de transferência!');
        setIsModalVisible(false); // Fecha o modal se a cópia for bem-sucedida
      }).catch(err => {
        message.error('Erro ao copiar automaticamente. Por favor, copie manualmente.');
        console.error('Erro ao copiar o log:', err);
      });
    } else {
      message.error('O navegador não suporta a cópia automática.');
    }
  };

  const handlePrimaryCopy = () => {
    const logText = formatWhatsApp(record, changes);
    handleCopyAttempt(logText); // Tenta a cópia automática imediatamente

    // Se a cópia automática falhar ou não for suportada, abre o modal para cópia manual/secundária
    // Isso será tratado pelo catch de handleCopyAttempt ou pela verificação inicial
    if (!(typeof navigator !== 'undefined' && navigator.clipboard)) {
        setFormattedLog(logText);
        setIsModalVisible(true);
    }
  };

  const handleModalCopy = () => {
    handleCopyAttempt(formattedLog); // Tenta copiar o texto já formatado no modal
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const hasChanges = changes.length > 0;

  return (
    <div style={{ maxWidth: 'auto', backgroundColor: '#2d2d2d', color: '#fff', padding: 32, borderRadius: 16, fontFamily: 'monospace' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <UserOutlined style={{ color: '#1890ff', fontSize: 18, marginRight: 8 }} />
          <span style={{ fontWeight: 'bold' }}>{record.usuario || '—'}</span>
          <span style={{ color: '#aaa', marginLeft: 8 }}>{record.acao || '—'}</span>
        </div>
        <Button
          type="text"
          icon={<CopyOutlined style={{ color: '#fff' }} />}
          onClick={handlePrimaryCopy} // Alterado para handlePrimaryCopy
          title="Copiar log para a área de transferência"
        />
      </div>
      <p style={{ margin: 0, paddingLeft: 26, color: '#fff' }}>{record.mensagem || '—'}</p>

      {hasChanges && (
        <div style={{ marginTop: 16 }}>
          <h5 style={{ margin: '0 0 8px', color: '#66ff66' }}>Alterações detalhadas:</h5>
          <div style={{ maxHeight: 500, overflowY: 'auto' }}>
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

      {/* Modal para cópia manual/automática secundária */}
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
        <p>
          Se a cópia automática falhou ou não é suportada, você pode tentar novamente ou copiar o texto abaixo manualmente.
        </p>
        <div style={{ backgroundColor: '#f0f0f0', padding: '16px', borderRadius: '4px' }}>
          <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
            {formattedLog}
          </pre>
        </div>
      </Modal>
    </div>
  );
};