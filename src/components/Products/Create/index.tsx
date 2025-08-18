'use client';

import { IProduto, IProdutoCreate } from '@/interfaces/IProduto';
import { Button, Form, App } from 'antd';
import React, { useCallback, useMemo, useState } from 'react';
import ProductFormInfo from '@/components/Products/Form';
import { produtosService } from '@/services/product.service';
import { useRouter } from 'next/navigation';
import SectionSeparator from '@/components/MiniComponents/SectionSeparator';
import { useAuth } from '@/contexts/AuthContext';
import getUserPermissions from '@/utils/permissions';
import ProfileStructure from '@/components/ProfileStructure';

const ProductCreate: React.FC = () => {
  const { notification } = App.useApp();
  const [form] = Form.useForm<IProdutoCreate>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const { permissions } = useAuth();

  const canCreate = useMemo(
    () => permissions.includes('produtos_criar'),
    [permissions]
  );

  const submitData = useCallback(() => {
    if (isLoading || !canCreate) return;

    form.validateFields().then(values => {
      setIsLoading(true);


      console.log('Form values:', values);
      produtosService
        .create(values)
        .then((response) => {
          notification.success({ message: 'Produto criado com sucesso!' });
          router.push(`/dashboard/configuracoes/produtos/${response.data.id}/editar`);
        })
        .catch((error) => {
          const responseData = error?.response?.data;
          if (responseData && typeof responseData === 'object') {
            Object.entries(responseData).forEach(([field, messages]) => {
              const messageArray = Array.isArray(messages) ? messages : [messages];
              messageArray.forEach(msg => {
                notification.error({
                  message: `${field}`,
                  description: msg,
                });
              });
            });
          } else {
            const detail = error?.response?.data?.detail || 'Erro ao criar produto';
            notification.error({ message: detail });
          }
        })
        .finally(() => setIsLoading(false));
    });
  }, [form, isLoading, canCreate, notification, router]);

  return (
    <div className="w-7xl container">
      <ProfileStructure
        isLoading={false}
        navTitle="Produtos > Novo"
        title="Novo Produto"
        menuButtons={[

          {
            title: 'Salvar',
            onClick: () => submitData(),
            isActive: false,
            disabled: !canCreate,
          },
        ]}
      >
        <div >
          <ProductFormInfo form={form} isEditing={false} permissions={permissions} />

        </div>
      </ProfileStructure>
    </div>
  );
};

export default React.memo(ProductCreate);