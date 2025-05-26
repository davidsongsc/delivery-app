// Transforma string em número (ex: "R$ 1.500,99" -> 1500.99)
export const formatCurrencyToNumber = (value: string): number | null => {
    const cleaned = value.replace(/\D/g, '');
    if (!cleaned) return null;
    return parseFloat((parseInt(cleaned, 10) / 100).toFixed(2));
};

// Formata o valor exibido no input (ex: 1500.99 -> R$ 1.500,99)
export const formatDisplayCurrency = (value: string): string => {
    const numericValue = formatCurrencyToNumber(value);
    if (!numericValue) return '';
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(numericValue);
};