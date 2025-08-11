const formatPhone = (value: string) => {
    const onlyNumbers = value.replace(/\D/g, '');
    if (onlyNumbers.length <= 10) {
        return onlyNumbers.replace(/(\d{2})(\d{4})(\d{0,4})/, (_, d1, d2, d3) =>
            d3 ? `(${d1}) ${d2}-${d3}` : `(${d1}) ${d2}`
        );
    }
    return onlyNumbers.replace(/(\d{2})(\d{5})(\d{0,4})/, (_, d1, d2, d3) =>
        d3 ? `(${d1}) ${d2}-${d3}` : `(${d1}) ${d2}`
    );
};

export default formatPhone;