'use client';

import { IProduto } from '@/interfaces/IProduto';
import { Button, Form, App } from 'antd';
import React, { useCallback, useEffect, useState, forwardRef, useImperativeHandle, useMemo } from 'react';
import ProductFormInfo from '@/components/Products/Form';
import { produtosService } from '@/services/product.service';
import { useRouter } from 'next/navigation';
import { convertImagensToFileList } from '@/utils/convertImagensToFileList';
import NotFound from '@/app/not-found';
import { useProdutoContext } from '@/contexts/ProdutoContext';
import flagsConfig from '@/components/constants/flags';
import { showChangesNotification } from '@/utils/notification';
import { useAuth } from '@/contexts/AuthContext';
import SectionSeparator from '@/components/MiniComponents/SectionSeparator';
import { ProdutoComposicaoCreateModal } from '@/components/ItemsComposicao/Create';
import { ProdutoComposicaoTable } from '@/components/ItemsComposicao/Table';
import { useProdutoComposicao } from '@/hooks/useProdutoComposicao';

export interface ProductEditInfoRef {
  submitForm: () => void;
}

interface ProductEditInfoProps {
  produtoLoading?: boolean;
  produtoRefresh?: () => void;
  onSave?: () => void;
}

function formatDate(value: string) {
  try {
    const d = new Date(value);
    return d.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  } catch {
    return value;
  }
}

function formatFlags(oldFlags: Record<string, boolean>, newFlags: Record<string, boolean>) {
  const diffs = [];
  for (const key in { ...oldFlags, ...newFlags }) {
    const oldVal = oldFlags[key] ?? false;
    const newVal = newFlags[key] ?? false;
    if (oldVal !== newVal) {
      diffs.push(`${key}: ${oldVal ? 'Sim' : 'Não'} → ${newVal ? 'Sim' : 'Não'}`);
    }
  }
  return diffs.length ? diffs.join('\n') : null;
}

function compareChanges(oldData: Partial<IProduto>, newData: Partial<IProduto>): string {
  const changes = [];
  for (const key in newData) {
    if (key === 'imagens') continue;
    const oldVal = oldData[key];
    const newVal = newData[key];

    if (JSON.stringify(oldVal) !== JSON.stringify(newVal)) {
      if (key === 'updated_at' && typeof oldVal === 'string' && typeof newVal === 'string') {
        changes.push(`Atualizado em: ${formatDate(oldVal)} → ${formatDate(newVal)}`);
      } else if (key === 'flags' && typeof oldVal === 'object' && typeof newVal === 'object') {
        const flagsDiff = formatFlags(oldVal as any, newVal as any);
        if (flagsDiff) changes.push(`Flags:\n${flagsDiff}`);
      } else {
        changes.push(`${key}: ${JSON.stringify(oldVal)} → ${JSON.stringify(newVal)}`);
      }
    }
  }
  return changes.length > 0 ? changes.join('\n') : 'Nenhuma alteração detectada.';
}

const ProductEditInfo = forwardRef<ProductEditInfoRef, ProductEditInfoProps>(({
  produtoLoading,
  produtoRefresh,
  onSave,
}, ref) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = () => setIsModalVisible(true);
  const handleCloseModal = () => setIsModalVisible(false);
  const [refreshTableFlag, setRefreshTableFlag] = useState(0);

  const handleItemCreated = (novaComp: any) => {
    notification.success({ message: 'Composição adicionada!' });
    setRefreshTableFlag(prev => prev + 1); // força refresh da table
  };
  const { notification } = App.useApp();
  const [form] = Form.useForm<IProduto>();
  const [isLoading, setIsLoading] = useState(false);
  const [initialProduto, setInitialProduto] = useState<IProduto | null>(null);
  const router = useRouter();
  const { registerSubmitHandler, produto, } = useProdutoContext();
  const defaultFlags = Object.fromEntries(flagsConfig.map(({ key }) => [key, false]));
  const { permissions } = useAuth();
  if (!permissions?.includes('produtos')) return <NotFound />;
  const { composicao, composicaoLoading, composicaoRefresh } = useProdutoComposicao({ id: produto?.id  });

  useEffect(() => {
    if (produto && Object.keys(produto).length > 0) {
      setInitialProduto(produto);
      const mergedFlags = {
        ...defaultFlags,
        ...produto.flags,
      };
      form.setFieldsValue({
        nome: produto.nome ?? '',
        nome_interno: produto.nome_interno ?? '',
        preco: produto.preco ?? 9.95,
        desconto: produto.desconto ?? 0,
        estoque: produto.estoque ?? 0,
        remover: produto.remover ?? [],
        adicionar: produto.adicionar ?? [],
        quantidade: produto.quantidade ?? 0,
        categoria_id: produto.categoria.id ?? '',
        ativo: produto.ativo ?? false,
        descricao: produto.descricao ?? '',
        imagens: convertImagensToFileList(produto.imagens || []),
        promocional: produto.promocional ?? false,
        composicao: produto.composicao ?? [],
        volume: produto.volume ?? '0',
        peso: produto.peso ?? '0',
        unidade_medida: produto.unidade_medida ?? '',
        tenant: produto.tenant ?? '',
        sku: produto.sku ?? '',
        flags: mergedFlags,
      });
    }
  }, [produto, form]);

  const submitData = useCallback(() => {
    if (isLoading || !produto?.id) return;

    form.validateFields().then(values => {
      setIsLoading(true);

      const formData = new FormData();
      formData.append('nome', values.nome);
      formData.append('nome_interno', values.nome_interno);
      formData.append('preco', String(values.preco ?? 9.95));
      formData.append('desconto', String(values.desconto ?? 0));
      formData.append('estoque', String(values.estoque ?? 10));
      formData.append('quantidade', String(values.quantidade ?? 10));
      formData.append('descricao', values.descricao || '');
      formData.append('promocional', values.promocional ? 'true' : 'false');
      formData.append('categoria_id', values.categoria_id || '');
      formData.append('sku', values.sku || '');
      formData.append('volume', String(values.volume ?? 0));
      formData.append('peso', String(values.peso ?? 0));
      formData.append('unidade_medida', values.unidade_medida || '');
      if (values.tenant) formData.append('tenant', values.tenant);
      formData.append('ativo', values.ativo ? 'true' : 'false');
      formData.append('flags', JSON.stringify(values.flags));
      (values.remover || []).forEach((item: string) => formData.append('remover', item));
      (values.composicao || []).forEach((item: string) => formData.append('composicao', item));
      (values.adicionar || []).forEach((item: { item: string; valor: number }) => formData.append('adicionar', JSON.stringify(item)));

      const imagens = values.imagens || [];
      const imagensIdsManter = imagens.filter((img: any) => !img.originFileObj).map((img: any) => img.uid);

      formData.append('imagens_ids_manter', JSON.stringify(imagensIdsManter));

      imagens.filter((img: any) => img.originFileObj).forEach((img: any) => formData.append('imagens', img.originFileObj));

      produtosService.update(produto.id, formData)
        .then((response) => {
          const changesSummary = initialProduto ? compareChanges(initialProduto, response.data) : '';

          if (changesSummary) {
            showChangesNotification(response.data.nome, changesSummary);
          } else {
            notification.info({
              message: response.data.nome,
              description: 'O produto foi atualizado com sucesso.',
            });
          }

          if (onSave) onSave();
          router.back();
        })
        .catch((error) => {
          const detail = error?.response?.data?.detail;
          const msg = detail || 'Erro ao atualizar produto';
          notification.error({ message: msg });
        })
        .finally(() => setIsLoading(false));
    });
  }, [form, isLoading, produto, notification, router, onSave, initialProduto]);

  useEffect(() => {
    if (registerSubmitHandler) {
      registerSubmitHandler(submitData);
    }
  }, [registerSubmitHandler, submitData]);

  useImperativeHandle(ref, () => ({
    submitForm: submitData,
  }));

  return (
    <>
      <ProductFormInfo form={form} isEditing permissions={permissions} />
      <SectionSeparator title="Composição do Produto">

        <Button type="primary" onClick={handleOpenModal}>Adicionar Item</Button>
        <div className='container-conteudo-small'>
          <ProdutoComposicaoCreateModal
            visible={isModalVisible}
            onClose={handleCloseModal}
            produtoId={produto?.id || ''}
            onCreated={handleItemCreated}
            composicaoRefresh={composicaoRefresh}
          />
          <ProdutoComposicaoTable composicao={composicao} composicaoLoading={composicaoLoading} composicaoRefresh={composicaoRefresh}/>
        </div>
      </SectionSeparator>
    </>
  );
});

ProductEditInfo.displayName = 'ProductEditInfo';

export default React.memo(ProductEditInfo);
