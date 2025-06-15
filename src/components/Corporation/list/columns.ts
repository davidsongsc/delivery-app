import { CorporationForm } from '@/store/CorporationRegisterForm';
import type { ColumnsType } from 'antd/es/table';

export const columns: ColumnsType<CorporationForm> = [
    {
        title: 'Pagina',
        dataIndex: 'page',
        key: 'page',
    },
    {
        title: 'Nome Fantasia',
        dataIndex: 'nome_fantasia',
        key: 'nome_fantasia',
    },
    {
        title: 'Razão Social',
        dataIndex: 'razao_social',
        key: 'razao_social',
    },
    {
        title: 'CNPJ',
        dataIndex: 'cnpj',
        key: 'cnpj',
    },
    {
        title: 'Telefone',
        dataIndex: 'telefone',
        key: 'telefone',
    },
    {
        title: 'Representante',
        dataIndex: 'representante_nome',
        key: 'representante_nome',
    },
    {
        title: 'Captador',
        dataIndex: 'registrado_por',
        key: 'registrado_por',
        render: (registrado_por) => registrado_por?.first_name || '—',
    },
    {
        title: 'Criado em',
        dataIndex: 'created_at',
        key: 'created_at',
        render: (text: string) => new Date(text).toLocaleDateString(),
    },
];
