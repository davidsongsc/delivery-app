export const fetchFipeData = async (codigoFipe: string) => {
    const res = await fetch(`/api/consulta-fipe`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ codigoFipe }),
    });

    if (!res.ok) {
        throw new Error('Erro ao consultar a Tabela FIPE');
    }

    const data = await res.json();
    return data.veiculo;
};
