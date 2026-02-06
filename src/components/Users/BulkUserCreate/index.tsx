import React, { useCallback, useState } from 'react';
import { Button, notification } from 'antd';
import { useWahaContacts } from '@/hooks/useContacts';
import { userService } from '@/services/user.service';

const sanitizeEmail = (name: string) => {
  return (
    name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // remove acentos
      .replace(/[^a-zA-Z0-9]/g, '')    // remove não alfanumérico
      .toLowerCase() + '@lojavel.com'
  );
};

const sanitizeUsername = (name: string) => {
  return (
    name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // remove acentos
      .replace(/[^a-zA-Z0-9]/g, '')    // remove não alfanumérico
      .toLowerCase() + ' lojavel'
  );
};

const parseContactToUser = (contact: { id: string; name: string }) => {
  const phone = contact.id.replace('@c.us', '').replace(/^55/, '');
  const [firstName, ...rest] = (contact.name || phone).split(' ');
  console.log(sanitizeEmail(contact.name || phone), sanitizeUsername(contact.name || phone));
  return {
    username: sanitizeEmail(contact.name || phone),
    email: sanitizeEmail(contact.name || phone),
    password: '2120203210',
    tipo: 'lead',
    canal: 'whatsapp',
    is_active: true,
    first_name: firstName,
    last_name: rest.join(' ') || '',
    phone: phone,
  };
};

const BulkUserCreate: React.FC = () => {
  const { contacts, loading } = useWahaContacts();
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateAll = useCallback(async () => {
    if (!contacts?.length) return;
    setIsLoading(true);

    for (const contact of contacts) {
      try {
        const userPayload = parseContactToUser(contact);
        await userService.create(userPayload);
        notification.success({
          message: `Usuário criado`,
          description: `${userPayload.first_name} (${userPayload.phone})`,
        });
      } catch (err: any) {
        notification.error({
          message: `Erro ao criar ${contact.name}`,
          description: err.response?.data || err.message,
        });
      }
    }

    setIsLoading(false);
  }, [contacts]);

  return (
    <div>
      <Button
        type="primary"
        loading={isLoading || loading}
        disabled={!contacts?.length}
        onClick={handleCreateAll}
      >
        Cadastrar todos os contatos
      </Button>
    </div>
  );
};

export default BulkUserCreate;
