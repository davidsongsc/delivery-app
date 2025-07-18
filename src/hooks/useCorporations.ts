import { useState, useEffect } from 'react';
import apiClient from '@/services/apiClient';
import { CorporationForm } from '@/store/CorporationRegisterForm';
import { notification } from 'antd';

export const useCorporations = () => {
    const [data, setData] = useState<CorporationForm[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchCorporations = async () => {
        setLoading(true);
        try {
            const response = await apiClient.get('/api/corporation-user/');
            setData(response.data.results);
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
        fetchCorporations();
    }, []);

    return { data, loading, refetch: fetchCorporations };
};
