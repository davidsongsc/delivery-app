'use client';

import { IProduto } from '@/interfaces/IProduto';
import { Button, Form, App, Spin } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ProductForm from '../Form';
import { produtosService } from '@/services/product.service';
import { useParams, useRouter } from 'next/navigation';
import { useProduto } from '@/hooks/useProduct';
import SectionSeparator from '@/components/MiniComponents/SectionSeparator';
import { useAuth } from '@/contexts/AuthContext';
import getUserPermissions from '@/utils/permissions';
import ProfileStructure from '@/components/ProfileStructure';

const ProductEdit: React.FC = () => {
  const { notification } = App.useApp();
  const [form] = Form.useForm<IProduto>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const { produto, produtoLoading, produtoRefresh } = useProduto({ id });

  const { user: authUser } = useAuth();
  const permissions = getUserPermissions(authUser);

  // Preenche o formulário quando o produto carregar
  useEffect(() => {
    if (produto) {
      form.setFieldsValue({
        nome: produto.nome,
        preco: produto.preco,
        desconto: produto.desconto,
        estoque: produto.estoque,
        remover: produto.remover,
        adicionar: produto.adicionar,
        quantidade: produto.quantidade,
        categoria_id: produto.categoria_id,
        ativo: produto.ativo,
        descricao: produto.descricao,
        imagem: produto.imagem,
        promocional: produto.promocional,
        composicao: produto.composicao,
        volume: produto.volume,
        peso: produto.peso,
        unidade_medida: produto.unidade_medida,
        tenant: produto.tenant,
        sku: produto.sku,
        imagens: produto.imagens,
      });
    }
  }, [produto, form]);


  const submitData = useCallback(() => {
    if (isLoading || !produto?.id) return;

    form.validateFields().then(values => {
      setIsLoading(true);

      const dataToUpdate: Partial<IProduto> = {
        nome: values.nome,
        preco: values.preco,
        desconto: values.desconto,
        estoque: values.estoque,
        remover: values.remover,
        adicionar: values.adicionar,
        quantidade: values.quantidade,
        categoria_id: values.categoria_id,
        ativo: values.ativo,
        descricao: values.descricao,
        imagem: values.imagem,
        promocional: values.promocional,
        composicao: values.composicao,
        volume: values.volume,
        peso: values.peso,
        unidade_medida: values.unidade_medida,
        tenant: values.tenant,
        sku: values.sku,
        imagens: values.imagens,
      };


      produtosService
        .update(produto.id, dataToUpdate)
        .then(() => {
          notification.success({
            message: 'Produto atualizado com sucesso!',
          });
          router.back();
        })
        .catch((error) => {
          const detail = error?.response?.data?.detail;
          const msg = detail || 'Erro ao atualizar produto';
          notification.error({ message: msg });
        })
        .finally(() => setIsLoading(false));
    });
  }, [form, isLoading, produto, notification, router]);

  return (
    <div className="w-7xl container">
      <ProfileStructure
        isLoading={produtoLoading}
        navTitle="Produtos > Editar"
        title="Editar Produto"
        menuButtons={[
          {
            title: 'Informações',
            link: `/dashboard/configuracoes/produtos/${id}/editar`,
            isActive: true,
          },
        ]}
      >
        <SectionSeparator title="Detalhes do Produto">
          <div className="container-conteudo-small mb-4">
            <ProductForm form={form} isEditing />
            {permissions.includes('produtos_editar') && (
              <Button type="primary" className="mt-4" onClick={submitData} loading={isLoading}>
                Salvar
              </Button>
            )}
          </div>
        </SectionSeparator>

      </ProfileStructure>
    </div>
  );
};

export default React.memo(ProductEdit);