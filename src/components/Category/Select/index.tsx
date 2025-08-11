import React, { useState } from 'react';
import { Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import SelectCategoryAutoComplete from '@/components/Category/AutoComplete';
import { CategoriaCreateModal } from '@/components/Category/Create';

interface SelectCategoryWithModalProps {
    value?: string;
    onChange?: (value: string, category?: any) => void;
    excludedCategoryIds?: string[];
    isDisabled?: boolean;
}

const SelectCategoryWithModal: React.FC<SelectCategoryWithModalProps> = ({
    value,
    onChange,
    excludedCategoryIds = [],
    isDisabled = false,
}) => {
    const [modalVisible, setModalVisible] = useState(false);

    // Callback para o modal informar nova categoria criada
    const handleCreated = (novaCategoria: any) => {
        setModalVisible(false);
        if (onChange) {
            onChange(novaCategoria.id, novaCategoria);
        }
    };

    return (
        <>
            <Space align="center" style={{ width: '100%' }}>
                <SelectCategoryAutoComplete
                    value={value}
                    onChange={onChange}
                    excludedCategoryIds={excludedCategoryIds}
                    isDisabled={isDisabled}
                    style={{ flex: 1 }}
                />
                <Button
                    type="default"
                    icon={<PlusOutlined />}
                    onClick={() => setModalVisible(true)}
                    disabled={isDisabled}
                />
            </Space>

            <CategoriaCreateModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onCreated={handleCreated}
            />
        </>
    );
};

export default React.memo(SelectCategoryWithModal);
