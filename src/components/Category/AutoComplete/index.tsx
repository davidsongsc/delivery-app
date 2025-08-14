import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { AutoComplete, Spin, Button, Space, Tooltip } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import { useCategoriesAutoComplete } from '@/hooks/useCategoriesAutoComplete';
import { ICategory } from '@/interfaces/ICategory';
import { useDebounce } from '@/hooks/useDebounce';
import { CategoriaCreateModal } from '@/components/Category/Create';
import { CategoriaEditModal } from '@/components/Category/Edit';

interface SelectCategoryAutoCompleteProps {
  value?: string;
  onChange?: (value: string, category?: ICategory) => void;
  excludedCategoryIds?: string[];
  isDisabled?: boolean;
}

const SelectCategoryAutoComplete: React.FC<SelectCategoryAutoCompleteProps> = ({
  value,
  onChange,
  excludedCategoryIds = [],
  isDisabled = false,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalCreateVisible, setModalCreateVisible] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [categoriesCache, setCategoriesCache] = useState<ICategory[]>([]);

  const debouncedSearchTerm = useDebounce(searchTerm, 1500);
  const filters = useMemo(() => ({ name: debouncedSearchTerm }), [debouncedSearchTerm]);

  const { categories, loading } = useCategoriesAutoComplete({ filters });

  useEffect(() => {
    setCategoriesCache(categories);
  }, [categories]);

  // SINCRONIZA searchTerm com o value (id da categoria)
  useEffect(() => {
    if (!value) {
      setSearchTerm('');
      return;
    }
    const selected = categoriesCache.find((cat) => cat.id === value);
    if (selected) {
      setSearchTerm(selected.nome);
    } else {
      setSearchTerm('');
    }
  }, [value, categoriesCache]);

  const selectedCategory = useMemo(() => categoriesCache.find((cat) => cat.id === value), [
    categoriesCache,
    value,
  ]);

  const handleClear = useCallback(() => {
    setSearchTerm('');
    onChange?.('');
  }, [onChange]);

  const handleSelect = useCallback(
    (selectedId: string) => {
      const selected = categoriesCache.find((cat) => cat.id === selectedId);
      if (!selected) return;
      setSearchTerm(selected.nome);
      onChange?.(selected.id, selected);
    },
    [categoriesCache, onChange]
  );

  return (
    <>
      <Space align="center" style={{ width: '100%' }}>
        <Spin spinning={loading} style={{ flexGrow: 1, minWidth: 0 }}>
          <AutoComplete
            disabled={isDisabled}
            showSearch
            placeholder="Selecione uma categoria"
            filterOption={false}
            options={categoriesCache
              .filter((cat) => !excludedCategoryIds.includes(cat.id))
              .map((cat) => ({
                label: cat.nome,
                value: cat.id,
              }))}
            value={searchTerm}
            onChange={(text) => {
              setSearchTerm(text);
              onChange?.(''); // limpa seleção para evitar inconsistência
            }}
            onSearch={setSearchTerm}
            onSelect={handleSelect}
            onBlur={() => {
              if (!value) {
                setSearchTerm('');
              } else if (selectedCategory) {
                setSearchTerm(selectedCategory.nome);
              }
            }}
            allowClear
            style={{ width: '100%' }}
          />
        </Spin>

        <Button
          type="default"
          icon={<PlusOutlined />}
          onClick={() => setModalCreateVisible(true)}
          disabled={isDisabled}
        />

        {selectedCategory && (
          <Tooltip title="Editar categoria selecionada">
            <Button
              type="default"
              icon={<EditOutlined />}
              onClick={() => setModalEditVisible(true)}
              disabled={isDisabled}
            />
          </Tooltip>
        )}
      </Space>

      <CategoriaCreateModal
        visible={modalCreateVisible}
        onClose={() => setModalCreateVisible(false)}
        onCreated={(novaCategoria) => {
          setCategoriesCache((prev) => [novaCategoria, ...prev]);
          setSearchTerm(novaCategoria.nome);
          onChange?.(novaCategoria.id, novaCategoria);
          setModalCreateVisible(false);
        }}
        parentCategories={categoriesCache}
      />

      <CategoriaEditModal
        visible={modalEditVisible}
        onClose={() => setModalEditVisible(false)}
        onUpdated={(categoriaAtualizada) => {
          setCategoriesCache((prev) =>
            prev.map((cat) => (cat.id === categoriaAtualizada.id ? categoriaAtualizada : cat))
          );
          setSearchTerm(categoriaAtualizada.nome);
          onChange?.(categoriaAtualizada.id, categoriaAtualizada);
          setModalEditVisible(false);
        }}
        categoryToEdit={selectedCategory || null}
        parentCategories={categoriesCache}
      />
    </>
  );
};

export default React.memo(SelectCategoryAutoComplete);
