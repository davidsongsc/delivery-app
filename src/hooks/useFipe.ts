import { useState, useCallback } from 'react';
import { fetchFipeData } from '@/services/fipe.service';

interface veiculo {
    marca: string;
    modelo: string;
    anoModelo: string;
    combustivel: string;
    valor: string;
    mesReferencia: string;
    codigoFipe: string;
    tipoVeiculo: number;
    dataConsulta: string;
}
export const useFipe = () => {
    const [veiculo, setVeiculo] = useState<veiculo | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const buscarFipe = useCallback(async (codigoFipe: string) => {
        setLoading(true);
        setError(null);

        try {
            const data = await fetchFipeData(codigoFipe);
            setVeiculo(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        veiculo,
        loading,
        error,
        buscarFipe,
    };
};
