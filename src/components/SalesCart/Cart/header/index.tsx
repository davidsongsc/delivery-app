import React, { useCallback, useState } from 'react';

import { formatPhoneNumberWeb } from '@/utils/phoneNumber';
import { formatCNPJ } from '@/utils/formatCnpj';
import { ILoja } from '@/interfaces/ILoja';
import { ICliente } from '@/interfaces/ICliente';
import { IPedido } from '@/interfaces/IPedido';
import { useLojaStore } from '@/store/useLojaStore';

interface ICarrinhoHeaderProps {
    loja: ILoja;
    pedido: IPedido
    cliente: ICliente
};



const CarrinhoHeader: React.FC<ICarrinhoHeaderProps> = ({ loja, cliente, pedido }) => {
    const { loja: lojaStore } = useLojaStore();
    return (
        <div>
            <div className='grid grid-cols-4 px-2 border-b border-gray-200 text-left'>

                <div className='col-span-2 '>
                    <span className='mr-2'>Loja:</span>
                    <span className='font-bold '>{lojaStore?.nome_fantasia}</span>
                </div>
                <div className='col-span-2'>
                    <span className='mr-2'>Telefone:</span>
                    <span className='font-bold'>{formatPhoneNumberWeb(lojaStore?.telefone!)}</span>
                </div>

                <div className='col-span-4'>
                    <span className='mr-2'>CNPJ:</span>
                    <span className='font-bold'>{formatCNPJ(lojaStore?.cnpj!)}</span>
                </div>
            </div>
            <div className='grid grid-cols-4 px-2 border-b-4 border-gray-200 text-left mt-2'>

                <div className='col-span-2 '>
                    <span className='mr-2'>Cliente:</span>
                    <span className='font-bold '>{cliente?.nome}</span>
                </div>
                <div className='col-span-1 '>
                    <span className='mr-2'>Hora:</span>
                    <span className='font-bold'>{pedido?.hora}</span>
                </div>
                <div className='col-span-1 '>
                    <span className='mr-2'>Data:</span>
                    <span className='font-bold'>{pedido.data}</span>
                </div>

                <div className='col-span-3 '>
                    <span className='mr-2'>Endereço:</span>
                    <span className='font-bold '>{cliente.endereco.rua}, {cliente.endereco.bairro} </span>
                </div>
                <div className='col-span-1 '>
                    <span className='mr-2'>Pedido:</span>
                    <span className='font-bold '>#{pedido.id}</span>
                </div>

            </div>

        </div>
    );
}

export default React.memo(CarrinhoHeader);