// Componente ProductCreate
'use client';

import { IProduto, IProdutoCreate } from '@/interfaces/IProduto';
import { Form, App } from 'antd';
import React, { useCallback, useMemo } from 'react';
import ProductFormInfo from '@/components/Products/Form';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import ProfileStructure from '@/components/ProfileStructure';
import { useProdutoMutations } from '@/hooks/useProdutoMutations';

const ProductCreate: React.FC = () => {
  const [form] = Form.useForm<IProdutoCreate>();
  const router = useRouter();

  const { permissions } = useAuth();
  const { createProduto, creating } = useProdutoMutations();

  const canCreate = useMemo(
    () => permissions.includes('produtos_criar'),
    [permissions]
  );

  const submitData = useCallback(() => {
    if (creating || !canCreate) return;

    form.validateFields().then(values => {
      const payload: IProdutoCreate = {
        ...values,
        nome: values.nome?.toLowerCase(),
        nome_interno: values.nome_interno?.toLowerCase(),
        descricao: values.descricao?.toLowerCase(),
      };

      // Chama a função de mutação e recebe o produto criado no onSuccess
      createProduto(payload, (data: IProduto) => {
        // data contém a resposta da API, que é o objeto do produto
        router.push(`/dashboard/configuracoes/produtos/${data.id}/editar`);
      });
    });
  }, [form, creating, canCreate, createProduto, router]);

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
            disabled: !canCreate || creating,
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