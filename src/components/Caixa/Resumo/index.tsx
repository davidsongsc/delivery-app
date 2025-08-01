'use client';

import React from 'react';
import { Card, Descriptions, Tag, Table, Typography, Divider } from 'antd';
import moment from 'moment';
import { ICaixa } from '@/interfaces/ICaixa';

const { Title } = Typography;

interface Props {
  caixa: ICaixa;
}

const CaixaResumo: React.FC<Props> = ({ caixa }) => {
  return (
    <Card title={`Caixa: ${caixa.nome}`} bordered style={{ marginBottom: '20px' }}>
      <Descriptions bordered size="small" column={{ xs: 1, sm: 2, md: 3 }}>
        <Descriptions.Item label="Operador">
          {caixa.operador_nome || '—'}
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          <Tag color={caixa.status === 'ABERTO' ? 'green' : 'red'}>
            {caixa.status_display}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Data de Abertura">
          {caixa.data_abertura ? moment(caixa.data_abertura).format('DD/MM/YYYY HH:mm') : '—'}
        </Descriptions.Item>

        <Descriptions.Item label="Turno">
          {caixa.turno || '—'}
        </Descriptions.Item>
        <Descriptions.Item label="Tipo">
          {caixa.tipo || '—'}
        </Descriptions.Item>
        <Descriptions.Item label="Data de Fechamento">
          {caixa.data_fechamento
            ? moment(caixa.data_fechamento).format('DD/MM/YYYY HH:mm')
            : '—'}
        </Descriptions.Item>

        <Descriptions.Item label="Saldo Inicial">
          R$ {Number(caixa.saldo_inicial || 0).toFixed(2)}
        </Descriptions.Item>
        <Descriptions.Item label="Saldo Atual">
          R$ {Number(caixa.saldo_atual || 0).toFixed(2)}
        </Descriptions.Item>
      </Descriptions>

      <Divider />

      <Title level={5}>Movimentações</Title>

      <Table
        dataSource={caixa.movimentacoes || []}
        rowKey="id"
        pagination={false}
        locale={{ emptyText: 'Sem movimentações registradas.' }}
        columns={[
          {
            title: 'Tipo',
            dataIndex: 'tipo',
            render: (tipo) => (
              <Tag color={tipo === 'ENTRADA' ? 'green' : 'volcano'}>
                {tipo}
              </Tag>
            ),
          },
          {
            title: 'Descrição',
            dataIndex: 'descricao',
          },
          {
            title: 'Valor',
            dataIndex: 'valor',
            render: (valor) => `R$ ${Number(valor || 0).toFixed(2)}`,
          },
          {
            title: 'Data',
            dataIndex: 'created_at',
            render: (data) => moment(data).format('DD/MM/YYYY HH:mm'),
          },
        ]}
      />
    </Card>
  );
};

export default CaixaResumo;