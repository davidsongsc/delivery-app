'use client'

import React, { useEffect, useState } from 'react'
import { Select, Spin, Button } from 'antd'
import { useItens } from '@/hooks/useItens'
import { ItemCreateModal } from '../ItemCreateModal'

const { Option } = Select

interface ItensSelectProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  filters?: object
  debounceTime?: number
}

export const ItensSelect: React.FC<ItensSelectProps> = ({
  value,
  onChange,
  placeholder = 'Selecione um item',
  filters = {},
  debounceTime = 500,
}) => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [modalVisible, setModalVisible] = useState(false)

  const { itens, itensTotal, itensRefresh, itensLoading } = useItens({
    page,
    filters: { ...filters, search: debouncedSearch },
    limit: 1000,
  })

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), debounceTime)
    return () => clearTimeout(handler)
  }, [search, debounceTime])

  useEffect(() => {
    if (value && !itens.find(item => item.id === value) && itens.length < itensTotal) {
      setPage(prev => prev + 1)
    }
  }, [value, itens, itensTotal])

  const handleItemCreated = async (newItemId: string) => {
    await itensRefresh()
    if (onChange) onChange(newItemId)
  }

  return (
    <>
      <Select
        showSearch
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        optionFilterProp="children"
        notFoundContent={itensLoading ? <Spin size="small" /> : null}
        filterOption={false}
        style={{ width: '100%' }}
        onSearch={setSearch}
        onPopupScroll={(e) => {
          const target = e.target as HTMLElement
          if (target.scrollTop + target.offsetHeight === target.scrollHeight && itens.length < itensTotal) {
            setPage(prev => prev + 1)
          }
        }}
        dropdownRender={menu => (
          <>
            {menu}
            <Button type="link" block onClick={() => setModalVisible(true)}>
              + Criar novo item
            </Button>
          </>
        )}
      >
        {itens.map(item => (
          <Option key={item.id} value={item.id}>
            {item.nome} ({item.categoria_nome})
          </Option>
        ))}
      </Select>

      <ItemCreateModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onCreated={handleItemCreated}
      />
    </>
  )
}
