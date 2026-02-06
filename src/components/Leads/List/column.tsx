import DeleteInColumn from '@/components/DeleteInColumn';
import { Tooltip } from 'antd';
import { ColumnGroupType } from 'antd/es/table';
import { ColumnType } from 'antd/lib/table';
import dayjs from 'dayjs';
import Link from 'next/link';
import React from 'react';
import { CiEdit } from 'react-icons/ci';
import { Mail, Phone, Globe, Users, HelpCircle } from 'lucide-react'
import { IUser } from '@/interfaces/IUser';
import { userService } from '@/services/user.service';

type UserColumnProps = (
  fetchData: () => void,
  userPermissions: string[]
) => (ColumnGroupType<any> | ColumnType<any>)[];


// mapeia os canais para texto + ícone
const canalLabels: Record<string, { label: string; icon: React.ReactNode }> = {
  email: { label: 'Email', icon: <Mail size={16} /> },
  telefone: { label: 'Telefone', icon: <Phone size={16} /> },
  site: { label: 'Site', icon: <Globe size={16} /> },
  indicacao: { label: 'Indicação', icon: <Users size={16} /> },
  outro: { label: 'Outro', icon: <HelpCircle size={16} /> },
}


const tipoUsuarioLabels: Record<string, string> = {
  lead: 'Aguardando atendimento',
  lead_s1: 'Cliente Atendido',
  lead_s2: 'Aguardando negociação',
  lead_s3: 'Aguardando pagamento',
  associado: 'Associado',
  equipe: 'Membro da Equipe',
  cliente: 'Cliente',
};
export const UserColumn: UserColumnProps = (fetchData, userPermissions) => {
  return [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Telefone',
      dataIndex: 'phone',
      key: 'phone',
      render: (value: string | null) => value ?? '-',
    },
    {
      title: 'Nome',
      dataIndex: 'first_name',
      key: 'first_name',
      render: (value: string | null) => value || '-',
    },
    {
      title: 'Sobrenome',
      dataIndex: 'last_name',
      key: 'last_name',
      render: (value: string | null) => value || '-',
    },
    {
      title: 'Canal',
      dataIndex: 'canal',
      key: 'canal',
      render: (value: string) => {
        const canal = canalLabels[value] || { label: value, icon: <HelpCircle size={16} /> }
        return (
          <div className="flex items-center gap-2">
            {canal.icon}
            <span>{canal.label}</span>
          </div>
        )
      },
    },

    {
      title: 'Status Lead',
      dataIndex: 'tipo_usuario',
      key: 'tipo_usuario',
      render: (value: string) => tipoUsuarioLabels[value] || '-',
    },
    {
      title: 'Criado em',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (value: string) =>
        value ? dayjs(value).format('DD/MM/YYYY HH:mm') : '-',
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (_, record: IUser) => (
        <div className="flex justify-around">
          {userPermissions.includes('usuarios_visualizar') && (
            <Tooltip title="Editar">
              <Link href={`/dashboard/configuracoes/usuarios/${record.id}/editar`}>
                <CiEdit size={20} />
              </Link>
            </Tooltip>
          )}
          {userPermissions.includes('usuarios_deletar') && (
            <DeleteInColumn
              id={record.id}
              service={userService}
              refresh={fetchData}
              title="Deseja deletar esse usuário?"
              successMessage="Usuário deletado com sucesso!"
              errorMessage="Erro ao deletar usuário"
            />
          )}
        </div>
      ),
    },
  ];
};
