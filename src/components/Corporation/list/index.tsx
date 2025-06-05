'use client';

import { useEffect, useState } from 'react';
import { Table, Typography, Spin, notification, Button, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import apiClient from '@/services/apiClient';
import { CorporationForm } from '@/store/CorporationRegisterForm';
import { columns } from './columns';
import CorporationRegisterModal from '../modal';

const { Title } = Typography;

const CorporationListPage = () => {
    const [data, setData] = useState<CorporationForm[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const fetchCorporations = async () => {
            setLoading(true);
            try {
                const response = await apiClient.get('/api/corporation-user/');
                setData(response.data);
            } catch (error: any) {
                notification.error({
                    message: 'Erro ao carregar empresas',
                    description: error.message || 'Tente novamente mais tarde.',
                });
            } finally {
                setLoading(false);
            }
        };

        fetchCorporations();
    }, []);
    console.log(data);
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
                    <Title level={2}>Empresas Cadastradas</Title>
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
