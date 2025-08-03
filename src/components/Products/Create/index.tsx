'use client';

import { IProduto, IProdutoCreate } from '@/interfaces/IProduto';
import { Button, Form, App } from 'antd';
import React, { useCallback, useMemo, useState } from 'react';
import ProductForm from '../Form';
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

  const { user: authUser } = useAuth();
  const permissions = getUserPermissions(authUser);

  const canCreate = useMemo(
    () => permissions.includes('produtos_criar'),
    [permissions]
  );

  const submitData = useCallback(() => {
    if (isLoading || !canCreate) return;

    form.validateFields().then(values => {
      setIsLoading(true);

      const formData = new FormData();

      formData.append('nome', values.nome);
      formData.append('preco', String(values.preco));
      formData.append('desconto', String(values.desconto || 0));
      formData.append('quantidade', String(values.quantidade || 0));
      formData.append('descricao', values.descricao || '');
      formData.append('promocional', String(values.promocional || false));
      formData.append('categoria_id', values.categoria_id);
      formData.append('tenant', values.tenant); // deve vir do form, store ou auth
      formData.append('ativo', String(values.ativo ?? true));

      // Arrays simples
      (values.remover || []).forEach((item: string) => {
        formData.append('remover', item);
      });

      (values.composicao || []).forEach((item: string) => {
        formData.append('composicao', item);
      });

      // Array de objetos (item, valor) – precisa serializar
      (values.adicionar || []).forEach((item: { item: string; valor: number }) => {
        formData.append('adicionar', JSON.stringify(item));
      });

      // Envio de imagem (uma ou várias)
      if (values.imagem) {
        const files = Array.isArray(values.imagem) ? values.imagem : [values.imagem];
        files.forEach((file: File) => {
          formData.append('imagens', file); // precisa bater com backend
        });
      }

      produtosService
        .create(formData)
        .then(() => {
          notification.success({
            message: 'Produto criado com sucesso!',
          });
          router.push('/dashboard/produtos');
        })
        .catch((error) => {
          const responseData = error?.response?.data;
          console.error('Error response data:', error);
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
            title: 'Informações',
            link: '/dashboard/produtos/novo',
            isActive: true,
          },
        ]}
      >
        <SectionSeparator title="Detalhes do Produto">
          <div className="container-conteudo-small mb-4">
            <ProductForm form={form} isEditing={false} />
            {canCreate ? (
              <Button type="primary" className="mt-4" onClick={submitData} loading={isLoading}>
                Criar Produto
              </Button>
            ) : (
              <p className="text-red-500 mt-4">Você não tem permissão para criar produtos.</p>
            )}
          </div>
        </SectionSeparator>
      </ProfileStructure>
    </div>
  );
};

export default React.memo(ProductCreate);