import type { ColumnsType } from 'antd/es/table';
import { CorporationMembership } from '../create';

export const columns: ColumnsType<CorporationMembership> = [
  {
    title: 'Nome Fantasia',
    dataIndex: ['corporation', 'nome_fantasia'],
    key: 'nome_fantasia',
  },
  {
    title: 'Razão Social',
    dataIndex: ['corporation', 'razao_social'],
    key: 'razao_social',
  },
  {
    title: 'CNPJ',
    dataIndex: ['corporation', 'cnpj'],
    key: 'cnpj',
  },
  {
    title: 'Telefone',
    dataIndex: ['corporation', 'telefone'],
    key: 'telefone',
  },
  {
    title: 'Representante',
    dataIndex: ['corporation', 'representante_nome'],
    key: 'representante_nome',
  },
  {
    title: 'Criado em',
    dataIndex: ['corporation', 'created_at'],
    key: 'created_at',
    render: (text: string) => new Date(text).toLocaleDateString(),
  },
];
