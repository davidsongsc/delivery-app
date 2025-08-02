export interface IMesa {
    id: number;
    tenant: string;
    numero: number;
    status: 'livre' | 'ocupada';
    tipo: 'MESA' | 'COMANDA' | 'RETIRADA' | 'DELIVERY' | 'AVULSO';
    results?: any;
}

export interface IMesaCreate {
    tenant: string;
    numero: number;
    status: 'livre' | 'ocupada';
    tipo: 'MESA' | 'COMANDA' | 'RETIRADA' | 'DELIVERY' | 'AVULSO';
}
