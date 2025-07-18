'use client';

import { useEffect, useState } from 'react';
import { Table, Typography, Spin, notification, Button, Row, Col } from 'antd';

import { columns } from './columns';
import CorporationRegisterModal from '../modal';
import { useCorporations } from '@/hooks/useCorporations';

const { Title } = Typography;

const CorporationListPage = () => {
    const { data, loading, refetch } = useCorporations();
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <div className="p-6">
            <CorporationRegisterModal
                open={modalVisible}
                onClose={() => setModalVisible(false)}
                onSuccess={() => {
                    // Ex: recarregar lista após sucesso
                    console.log('Empresa cadastrada!');
                }}
            />
            <Row justify="space-between" align="middle" className="mb-4">
                <Col>
                    <Title level={2}>Lista Empresas</Title>
                </Col>
                <Col>
                    <Button type="primary" onClick={() => setModalVisible(true)}>
                        Adicionar Empresa
                    </Button>
                </Col>
            </Row>

            {loading ? (
                <Spin />
            ) : (
                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey="uid"
                    pagination={{ pageSize: 10 }}
                />
            )}
        </div>
    );
};

export default CorporationListPage;
