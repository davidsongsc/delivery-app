import React from 'react';

type PaymentStatusProps = {
    status?: number;
};

const PaymentStatus: React.FC<PaymentStatusProps> = ({ status = 0 }) => {
    let text = '';
    let color = '';

    switch (status) {
        case 0:
            text = 'Indefinido';
            color = 'text-sistemaRed';
            break;
        case 1:
            text = 'Regular';
            color = 'text-sistemaGreen';
            break;
        case 2:
            text = 'Pendente';
            color = 'text-sistemaYellow';
            break;
        case 3:
            text = 'Cancelado';
            color = 'text-sistemaRed';
            break;
        default:
            text = 'Desconhecido';
            color = 'text-sistemaBlue';
            break;
    }

    return <span className={`text-sm font-semibold ${color}`}>{text}</span>;
};

export default React.memo(PaymentStatus);
