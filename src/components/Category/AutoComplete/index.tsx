import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { AutoComplete, Spin } from 'antd';
import { useCategoriesAutoComplete } from '@/hooks/useCategoriesAutoComplete';
import { ICategory } from '@/interfaces/ICategory';
import { useDebounce } from '@/hooks/useDebounce';

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
  const debouncedSearchTerm = useDebounce(searchTerm, 1500);
  const filters = useMemo(() => ({ name: debouncedSearchTerm }), [debouncedSearchTerm]);

  useEffect(() => {
    setInternalValue(value || '');
  }, [value]);

  // Debounce opcional, pode usar seu hook useDebounce para otimizar
  const { categories, loading } = useCategoriesAutoComplete({
    filters,
  });

  const selectedCategory = useMemo(
    () => categories.find((cat) => cat.id === value),
    [categories, value]
  );

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

  return (
    <Spin spinning={loading}>
      <AutoComplete
        disabled={isDisabled}
        showSearch
        placeholder="Selecione uma categoria"
        filterOption={false}
        options={categories
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
      />
    </Spin>
  );
};

export default React.memo(SelectCategoryAutoComplete);
