'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Input, Select } from 'antd';
import Image from 'next/image';
import { SearchOutlined } from '@ant-design/icons';
import Masks from '@/utils/masks';
import { normalizeText } from '@/utils/normalizeText';
import UserRoleToTag from '@/components/Users/UserRoleToTag';
import { UserRoles, UserRolesTranslated } from '@/enum/UserRoles';
import { FaStar } from 'react-icons/fa';
import { OptionType } from '@/interfaces/IOptionType';

const { Option } = Select;

interface PageSizeSelectorProps {
  pageSize: number;
  setPageSize: (size: number) => void;
  setPage: (page: number) => void;
  filters?: Record<string, any>;
  setFilters?: (filters: Record<string, string>) => void;
  filterOptions?: OptionType[];
  selectedField?: string;
  setSelectedField?: (field: string) => void;
  children?: React.ReactNode;
}

const PageSizeSelector: React.FC<PageSizeSelectorProps> = ({
  pageSize,
  setPageSize,
  setPage,
  filters = {},
  filterOptions = [],
  setFilters,
  selectedField = 'name',
  setSelectedField,
  children,
}) => {
  const [showSelect, setShowSelect] = useState<boolean>(false);
  const [supplierOptions, setSupplierOptions] = useState<OptionType[]>([]);
  const resolvedFilterOptions = useMemo<OptionType[]>(() => {
    return Array.isArray(filterOptions) && filterOptions.length > 0
      ? filterOptions
      : [
        { value: 'name', label: 'Nome' },
        { value: 'document', label: 'Documento' },
        { value: 'phone', label: 'Telefone' },
        { value: 'email', label: 'E-mail' },
        { value: 'observation', label: 'Observação' },
        { value: 'role', label: 'Permissão' },
      ];
  }, [filterOptions]);


  const handleInputChange = useCallback(
    (value: string) => {
      if (!setFilters) return;

      let maskedValue = value;

      if (selectedField === 'document') {
        maskedValue = value.length <= 14 ? Masks.cpf(value) : Masks.cnpj(value);
      }

      else if (selectedField === 'phone') {
        maskedValue = Masks.phone(value);
      }

      else if (selectedField === 'observation') {
        maskedValue = normalizeText(value);
      }

      setFilters({
        ...filters,
        [selectedField]: maskedValue,
      });
    },
    [selectedField, setFilters, filters]
  );

  const handleOpenFilter = useCallback(() => {
    setShowSelect(true);
    setFilters?.({});
  }, [setFilters]);

  const handleFilterSelect = useCallback(
    (field: string) => {
      setSelectedField?.(field);
      setFilters?.({});
      setShowSelect(false);
    },
    [setSelectedField, setFilters]
  );

  const placeholderText = useMemo(() => {
    return `Filtrar por ${resolvedFilterOptions.find((f) => f.value === selectedField)?.label || ''
      }`;
  }, [resolvedFilterOptions, selectedField]);

  const onChangeHandler = useCallback((value: boolean | string) => {

    setFilters?.({
      ...filters,
      [selectedField]: value,
    });
  }, [filters, selectedField, setFilters]);

  const filterInput = useMemo(() => {

    if (selectedField === 'role') {
      return (
        <Select
          className="w-full"
          allowClear
          placeholder={placeholderText}
          onChange={onChangeHandler}
          value={filters[selectedField] || undefined}
          options={Object.entries(UserRolesTranslated).map(([key, label]) => ({
            value: key,
            label: <UserRoleToTag role={key as UserRoles} />,
          }))}
        />
      );
    } else if (selectedField === 'supplier_id') {
      return (
        <Select
          className="w-full"
          allowClear
          showSearch
          placeholder={placeholderText}
          optionFilterProp="label"
          onChange={onChangeHandler}
          value={filters[selectedField] || undefined}
          options={supplierOptions}
        />
      );
    } else if (selectedField === 'is_active') {
      return (
        <Select
          className="w-full"
          allowClear
          placeholder={placeholderText}
          onChange={onChangeHandler}
          value={filters[selectedField] !== undefined ? filters[selectedField] : undefined}
          options={[
            { value: true, label: 'Ativo' },
            { value: false, label: 'Inativo' }
          ]}
        />
      );
    } else if (selectedField === 'is_initial_status') {
      return (
        <Select
          className="w-full"
          allowClear
          placeholder={placeholderText}
          onChange={onChangeHandler}
          value={filters[selectedField] !== undefined ? filters[selectedField] : undefined}
          options={[
            {
              value: true, label: <span className="flex items-center justify-between ">
                Ativo <FaStar size={20} color="gold" />
              </span>
            },
            {
              value: false, label: <span className="flex items-center justify-between">
                Inativo <FaStar size={20} color="gray" />
              </span>
            }
          ]}
        />
      );
    }

    return (
      <Input
        placeholder={placeholderText}
        prefix={<SearchOutlined className="text-darkTextoDescricao pr-2" />}
        className="rounded-[10px] text-primary border border-darkTextoOff focus:border-primary focus:ring-0"
        onChange={(e) => handleInputChange(e.target.value)}
        value={filters[selectedField] || ''}
        allowClear
      />
    );
  }, [selectedField, filters, placeholderText, handleInputChange, setFilters]);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 border-b border-darkTextoOff py-4 px-6 ">

      <div className="lg:col-span-3 flex items-center gap-2">
        {filterInput}
      </div>
      <div className="lg:col-span-7 flex justify-start items-center gap-3">
        {setFilters && !showSelect && (
          <Button
            type="default"
            className="border-none "
            onClick={handleOpenFilter}
            title="Selecionar novo filtro"
          >
            <Image
              src="/images/icons/filter.svg"
              alt="filter"
              width={35}
              height={35}
            />
          </Button>
        )}
        {showSelect && (
          <Select
            value={selectedField}
            onChange={handleFilterSelect}
            className="w-[150px] text-primary"
            autoFocus
          >
            {resolvedFilterOptions.map((opt) => (
              <Option key={opt.value} value={opt.value}>
                {opt.label}
              </Option>
            ))}
          </Select>
        )}
      </div>
      <div className="lg:col-span-2 flex justify-start items-center">
        <Select
          className="w-[72px] text-primary"
          value={pageSize}
          onChange={(value) => {
            setPageSize(value);
            setPage(1);
          }}
        >
          <Option value={10}>10</Option>
          <Option value={20}>20</Option>
          <Option value={50}>50</Option>
          <Option value={100}>100</Option>
        </Select>
        <span className="flex ml-4 text-lg text-option items-center">
          Resultados por página
        </span>
      </div>

    </div>
  );
};

export default React.memo(PageSizeSelector);
