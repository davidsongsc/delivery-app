import { ISaleStatus } from '@/interfaces/ISaleStatus';
import React from 'react';

interface ISalesStatusProps {
    data: ISaleStatus;
}

const SalesStatusText = ({ data }: ISalesStatusProps) => {
    return (
        <span style={{ color: data.color }}>
            {data.name}
        </span>
    );
};

export default React.memo(SalesStatusText);
