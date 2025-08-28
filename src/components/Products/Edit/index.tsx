'use client';

import { IProduto } from '@/interfaces/IProduto';
import { Button, Form, App } from 'antd';
import React, { useCallback, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
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
import { IProdutoFlags } from '@/interfaces/IProduto';

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

function formatFlags(oldFlags: IProdutoFlags, newFlags: IProdutoFlags) {
  const diffs = [];
  const allKeys = new Set([...Object.keys(oldFlags), ...Object.keys(newFlags)]);

  for (const key of Array.from(allKeys)) {
    const oldVal = oldFlags[key as keyof IProdutoFlags] ?? false;
    const newVal = newFlags[key as keyof IProdutoFlags] ?? false;
    if (oldVal !== newVal) {
      diffs.push(`${key}: ${oldVal ? 'Sim' : 'Não'} → ${newVal ? 'Sim' : 'Não'}`);
    }
  }
  return diffs.length ? diffs.join('\n') : null;
}

function compareChanges(oldData: Partial<IProduto>, newData: Partial<IProduto>): string {
  const changes = [];
  const keysToIgnore = ['imagens', 'created_at', 'updated_at', 'tenant'];

  for (const key in newData) {
    if (keysToIgnore.includes(key) || !Object.prototype.hasOwnProperty.call(oldData, key)) {
      continue;
    }

    const oldVal = oldData[key as keyof IProduto];
    const newVal = newData[key as keyof IProduto];

    if (JSON.stringify(oldVal) !== JSON.stringify(newVal)) {
      if (key === 'flags' && typeof oldVal === 'object' && typeof newVal === 'object') {
        const flagsDiff = formatFlags(oldVal as IProdutoFlags, newVal as IProdutoFlags);
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

  const handleItemCreated = () => {
    notification.success({ message: 'Composição adicionada!' });
    setRefreshTableFlag(prev => prev + 1);
  };

  const { notification } = App.useApp();
  const [form] = Form.useForm<IProduto>();
  const [isLoading, setIsLoading] = useState(false);
  const [initialProduto, setInitialProduto] = useState<IProduto | null>(null);
  const router = useRouter();
  const { registerSubmitHandler, produto } = useProdutoContext();
  const defaultFlags: IProdutoFlags = Object.fromEntries(
    flagsConfig.map(({ key }) => [key, false])
  ) as IProdutoFlags;

  const { permissions } = useAuth();

  const produtoId = produto?.id || '';
  const { composicao, composicaoLoading, composicaoRefresh } = useProdutoComposicao({ id: produtoId });

  useEffect(() => {
    if (produto && Object.keys(produto).length > 0) {
      setInitialProduto(produto);
      const mergedFlags = {
        ...defaultFlags,
        ...produto.flags,
      };
      form.setFieldsValue({
        ...produto,
        nome: produto.nome.toLocaleLowerCase() ?? '',
        nome_interno: produto.nome_interno.toLocaleLowerCase() ?? '',
        preco: produto.preco ?? 9.95,
        desconto: produto.desconto ?? 0,
        estoque: produto.estoque ?? 0,
        quantidade: produto.quantidade ?? 0,
        categoria_id: produto.categoria?.id ?? '',
        descricao: produto.descricao ?? '',
        volume: produto.volume ?? '',
        ativo: produto.ativo ?? false,
        peso: produto.peso ?? '',
        unidade_medida: produto.unidade_medida ?? '',
        sku: produto.sku ?? '',
        imagens: convertImagensToFileList(produto.imagens || []),
        flags: mergedFlags,

      });
    } else {

      form.setFieldsValue({

        flags: defaultFlags,
      });
    }
  }, [produto, form, defaultFlags]);

  // No arquivo ProductEditInfo.tsx
  const submitData = useCallback(() => {
    if (isLoading || !produto?.id) return;

    form.validateFields().then(values => {
      setIsLoading(true);
      console.log('Form Values before submit:', values);
      const formData = new FormData();

      // 1. Adicionar os campos básicos e de texto
      // Isso garante que campos como nome, preco, etc., sejam adicionados
      formData.append('nome', values.nome.toLowerCase());
      formData.append('nome_interno', values.nome_interno.toLocaleLowerCase());
      formData.append('preco', String(values.preco ?? 9.95));
      formData.append('desconto', String(values.desconto ?? 0));
      formData.append('estoque', String(values.estoque ?? 10));
      formData.append('quantidade', String(values.quantidade ?? 10));
      formData.append('descricao', values.descricao.toLocaleLowerCase() || '');
      formData.append('promocional', values.promocional ? 'true' : 'false');
      formData.append('categoria_id', values.categoria_id || '');
      formData.append('sku', values.sku || '');
      formData.append('volume', String(values.volume ?? 0));
      formData.append('peso', String(values.peso ?? 0));
      formData.append('unidade_medida', values.unidade_medida || '');
      if (values.tenant) {
        formData.append('tenant', values.tenant);
      }
      // A flag 'ativo' é parte do objeto 'flags', então não precisamos dela aqui.
      formData.append('ativo', values.ativo ? 'true' : 'false');

      // 2. Adicionar o objeto 'flags' como uma string JSON
      if (values.flags) {
        console.log('values.flags', values.flags);
        formData.append('flags', JSON.stringify(values.flags));
      }

      // 3. Adicionar arrays de forma explícita
      (values.remover || []).forEach((item) => formData.append('remover', item));
      (values.composicao || []).forEach((item) => formData.append('composicao', item));
      (values.adicionar || []).forEach((item) => formData.append('adicionar', JSON.stringify(item)));

      // 4. Adicionar imagens e IDs das imagens mantidas
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
          console.log('Response data:', response.data);
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

  if (!permissions?.includes('produtos')) return <NotFound />;

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
          <ProdutoComposicaoTable composicao={composicao} composicaoLoading={composicaoLoading} composicaoRefresh={composicaoRefresh} />
        </div>
      </SectionSeparator>
    </>
  );
});

ProductEditInfo.displayName = 'ProductEditInfo';

export default React.memo(ProductEditInfo);