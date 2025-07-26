'use client';

import { useEffect, useState } from 'react';
import { Table, Typography, Spin, notification, Button, Row, Col } from 'antd';
import { useRouter } from 'next/navigation';
import apiClient from '@/services/apiClient';
import { columns } from './columns';
import CorporationRegisterModal from '../modal';
import { CorporationMembership } from '../Create';
import { User } from '@/types/User';
import PageSection from '@/components/MiniComponents/PageSection';

const { Title } = Typography;

const UsersList = () => {
    const [data, setData] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);
    const [pagination, setPagination] = useState({
        total: 0,
        current: 1,
        totalPages: 0,
    });
    const fetchCorporations = async (page = 1, callback?: () => void) => {
        setLoading(true);
        try {
            const response = await apiClient.get(`/api/usuarios/?page=${page}`);

            setData(response.data.results);

            setPagination({
                total: response.data.count,
                current: response.data.current_page,
                totalPages: response.data.total_pages,
            });

            if (callback) callback(); // executa o callback se foi passado
        } catch (error: any) {
            notification.error({
                message: 'Erro ao carregar empresas',
                description: error.message || 'Tente novamente mais tarde.',
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCorporations(pagination.current);
    }, []);


    console.log(data);
    return (
        <div className="px-40 py-10 min-h-[60vh]">
            <CorporationRegisterModal
                open={modalVisible}
                onClose={() => setModalVisible(false)}
                onSuccess={() => {
                    // Ex: recarregar lista após sucesso
                    console.log('Empresa cadastrada!');
                }}
            />
            <PageSection
                title="Usuários"
                buttonText="Adicionar Usuário"
                onButtonClick={() => setModalVisible(true)}
                extra={
                    <Button type="link" onClick={() => router.push('/dashboard/configuracoes/usuarios/invite')}>
                        Convidar Usuário
                    </Button>
                }
            />
            {loading ? (
                <Spin />
            ) : (
                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey="uid"
                    loading={loading}
                    pagination={{
                        current: pagination.current,
                        total: pagination.total,
                        pageSize: 10,
                    }}
                    onChange={(paginationInfo) => {
                        fetchCorporations(paginationInfo.current);
                    }}
                />
            )}
        </div>
    );
};

export default UsersList;
