import type { ColumnsType } from 'antd/es/table';
import { CorporationMembership } from '../Create';
import { User } from '@/types/User';

export const columns: ColumnsType<User> = [
  {
    title: 'Usuário',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Nível de Acesso',
    dataIndex: ['access_level', 'level'],
    key: 'access_level',
    render: (level) => level || '-',
  },
  {
    title: 'Permissões',
    dataIndex: ['access_level', 'permissions'],
    key: 'permissions',
    render: (permissions: string[]) => permissions?.join(', ') || '-',
  },
  {
    title: 'Vínculo Corporativo',
    dataIndex: ['corporation_member', 'nome'],
    key: 'corporation_member_nome',
  },
  {
    title: 'Tipo de Perfil',
    dataIndex: ['corporation_member', 'tipo'],
    key: 'corporation_member_tipo',
  },
];
