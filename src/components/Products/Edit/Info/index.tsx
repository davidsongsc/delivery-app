'use client';

import { IProduto } from '@/interfaces/IProduto';
import { Button, Form, App, Spin } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ProductFormInfo from '@/components/Products/Form/info';
import { produtosService } from '@/services/product.service';
import { useParams, useRouter } from 'next/navigation';
import { useProduto } from '@/hooks/useProduct';
import SectionSeparator from '@/components/MiniComponents/SectionSeparator';
import { useAuth } from '@/contexts/AuthContext';
import getUserPermissions from '@/utils/permissions';
import { convertImagensToFileList } from '@/utils/convertImagensToFileList';
import NotFound from '@/app/not-found';
import DeleteInColumn from '@/components/DeleteInColumn';


const ProductEditInfo: React.FC = () => {
  const { notification } = App.useApp();
  const [form] = Form.useForm<IProduto>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const { produto, produtoLoading, produtoRefresh } = useProduto({ id });
  
  const { user: authUser } = useAuth();
  const permissions = getUserPermissions(authUser);
  console.log(permissions.includes('produtos_criar'), 'AQUIIIII')
  // Preenche o formulário quando o produto carregar
  useEffect(() => {

    if (produto) {

      form.setFieldsValue({
        nome: produto.nome,
        nome_interno: produto.nome_interno,
        preco: produto.preco,
        desconto: produto.desconto,
        estoque: produto.estoque,
        remover: produto.remover,
        adicionar: produto.adicionar,
        quantidade: produto.quantidade,
        categoria_id: produto.categoria_id,
        ativo: produto.ativo,
        descricao: produto.descricao,
        imagens: convertImagensToFileList(produto.imagens!),
        promocional: produto.promocional,
        composicao: produto.composicao,
        volume: produto.volume,
        peso: produto.peso,
        unidade_medida: produto.unidade_medida,
        tenant: produto.tenant,
        sku: produto.sku,
      });
    }
  }, [produto, form]);
  

  const submitData = useCallback(() => {
    if (isLoading || !produto?.id) return;

    form.validateFields().then(values => {
      setIsLoading(true);

      const formData = new FormData();

      // Campos simples
      formData.append('nome', values.nome);
      formData.append('nome_interno', values.nome_interno);
      formData.append('preco', String(values.preco ?? 0));
      formData.append('desconto', String(values.desconto ?? 0));
      formData.append('estoque', String(values.estoque ?? 0));
      formData.append('quantidade', String(values.quantidade ?? 0));
      formData.append('descricao', values.descricao || '');
      formData.append('promocional', values.promocional ? 'true' : 'false');
      formData.append('categoria_id', values.categoria_id || '');


      if (values.tenant) formData.append('tenant', values.tenant);
      formData.append('ativo', values.ativo ? 'true' : 'false');

      // Campos array simples (se usar)
      (values.remover || []).forEach((item: string) => {
        formData.append('remover', item);
      });
      (values.composicao || []).forEach((item: string) => {
        formData.append('composicao', item);
      });
      (values.adicionar || []).forEach((item: { item: string; valor: number }) => {
        formData.append('adicionar', JSON.stringify(item));
      });

      // Imagens - separar imagens novas e IDs das existentes a manter
      const imagens = values.imagens || [];

      // IDs das imagens existentes a manter
      const imagensIdsManter = imagens
        .filter((img: any) => !img.originFileObj)  // sem arquivo => já existente
        .map((img: any) => img.uid);

      formData.append('imagens_ids_manter', JSON.stringify(imagensIdsManter));

      // Imagens novas (arquivos)
      imagens
        .filter((img: any) => img.originFileObj)
        .forEach((img: any) => {
          formData.append('imagens', img.originFileObj);
        });
      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      produtosService
        .partialUpdate(produto.id, formData)
        .then(() => {
          notification.success({
            message: 'Informações atualizadas!',
            description: 'O produto foi atualizado com sucesso.',
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

  if (!permissions.includes('produtos')) return NotFound();

  return (
    <>
      <SectionSeparator title="Detalhes do Produto">
        <div className="container-conteudo-small mb-4">
          <ProductFormInfo form={form} isEditing permissions={permissions} />
          {permissions.includes('produtos_editar') && (

            <div className='grid grid-cols-6 gap-4'>
              <Button type="primary" className="mt-4 w-full" onClick={submitData} loading={isLoading}>
                Salvar
              </Button>
              {permissions.includes('produtos_criar') && (

                <Button
                  type="default"
                  className="mt-4 w-full" onClick={() => { router.push('/dashboard/configuracoes/produtos/cadastrar') }}
                  disabled={!permissions.includes('produtos_criar')}

                >
                  Novo Produto
                </Button>

              )}
              {permissions.includes('produtos_deletar') && (
                <DeleteInColumn
                  id={id}
                  service={produtosService}
                  refresh={produtoRefresh}
                  title={'Deletar produto?'}
                  span='Deletar produto'
                  permissions={permissions}
                />
              )}
            </div>
          )}
        </div>
      </SectionSeparator >
    </>
  );
};

export default React.memo(ProductEditInfo);