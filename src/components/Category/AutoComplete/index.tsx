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
  const [internalValue, setInternalValue] = useState('');
  const [modalCreateVisible, setModalCreateVisible] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [categoriesCache, setCategoriesCache] = useState<ICategory[]>([]);

  const debouncedSearchTerm = useDebounce(searchTerm, 1500);
  const filters = useMemo(() => ({ name: debouncedSearchTerm }), [debouncedSearchTerm]);

  const { categories, loading } = useCategoriesAutoComplete({ filters });

  useEffect(() => {
    setInternalValue(value || '');
  }, [value]);

  useEffect(() => {
    setCategoriesCache(categories);
  }, [categories]);

  const selectedCategory = useMemo(() => categories.find((cat) => cat.id === value), [categories, value]);

  const handleClear = useCallback(() => {
    setSearchTerm('');
    onChange?.('');
  }, [onChange]);

  const handleSelect = useCallback(
    (selectedId: string) => {
      const selected = categories.find((cat) => cat.id === selectedId);
      if (!selected) return;
      setSearchTerm(selected.nome);
      onChange?.(selected.id, selected);
    },
    [categories, onChange]
  );

  const handleModalCreated = (novaCategoria: ICategory) => {
    setCategoriesCache((prev) => [novaCategoria, ...prev]);
    setSearchTerm(novaCategoria.nome);
    onChange?.(novaCategoria.id, novaCategoria);
    setModalCreateVisible(false);
  };

  const handleModalUpdated = (categoriaAtualizada: ICategory) => {
    setCategoriesCache((prev) =>
      prev.map((cat) => (cat.id === categoriaAtualizada.id ? categoriaAtualizada : cat))
    );
    setSearchTerm(categoriaAtualizada.nome);
    onChange?.(categoriaAtualizada.id, categoriaAtualizada);
    setModalEditVisible(false);
  };

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
              if (!text) {
                handleClear();
              } else {
                setSearchTerm(text);
              }
            }}
            onSearch={setSearchTerm}
            onSelect={handleSelect}
            onBlur={() => {
              if (!internalValue) {
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
        onCreated={handleModalCreated}
        parentCategories={categoriesCache}
      />

      <CategoriaEditModal
        visible={modalEditVisible}
        onClose={() => setModalEditVisible(false)}
        onUpdated={handleModalUpdated}
        categoryToEdit={selectedCategory || null}
        parentCategories={categoriesCache}
      />
    </>
  );
};

export default React.memo(SelectCategoryAutoComplete);
