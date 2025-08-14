export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
};

// utils/currencyBR.ts
export const formatCurrencyBR = (value: string | number): string => {
    let raw = String(value).replace(/\D/g, '');
    if (!raw) raw = '0';
    let numberValue = parseInt(raw, 10);
    let formatted = (numberValue / 100)
        .toFixed(2)
        .replace('.', ',')
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `R$ ${formatted}`;
};

export const parseCurrencyBR = (value: string): number => {
    return Number(value.replace(/[R$\s.]/g, '').replace(',', '.')) || 0;
};
