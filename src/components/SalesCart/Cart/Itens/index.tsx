import React from 'react';
import Image from 'next/image';
import { CiSquareRemove, CiSquarePlus } from 'react-icons/ci';
import { useDeliveryStore } from '@/store/deliveryStore';

const CarrinhoItens: React.FC = () => {
    const { itensPedido, alterarQuantidade } = useDeliveryStore();

    return (
        <div className=''>
            <div className='grid grid-cols-12 py-1 text-sm font-bold'>
                <span className='col-span'>Item</span>
            </div>

            {itensPedido.map((item, index) => (
                <div key={index} className='flex items-center justify-between border-t border-gray-500'>
                    <div className='grid grid-cols-12 py-1 text-sm '>
                        <div className='col-span-2 flex items-center justify-center p-2'>
                            <Image src={`${process.env.NEXT_PUBLIC_FILES}/imagens/cardapio/${item.id}.png`} width={80} height={80} alt={item.nome} />
                        </div>

                        <div className='col-span-8 grid grid-cols-12'>
                            <div className='col-span-12 font-bold uppercase text-xl flex items-center gap-2 justify-between'>
                                <span>{item.nome}</span>
                            </div>

                            <div className='col-span-10 grid grid-cols-12'>
                                {item.remover.length > 0 && (
                                    <div className='col-span-4 flex flex-col text-left font-bold mr-2'>
                                        {item.remover.map((remover, i) => (
                                            <span key={i} className='flex items-center gap-2 uppercase text-d_primary'>
                                                <CiSquareRemove size={20} />
                                                {remover}
                                            </span>
                                        ))}
                                    </div>
                                )}


                                <div className='col-span-8 flex flex-col text-left font-bold'>
                                    {item.adicionar.map((adicionar, i) => {
                                        const nome = typeof adicionar === 'string' ? adicionar : adicionar.item;
                                        const valor = typeof adicionar === 'object' ? `+R$ ${adicionar.valor.toFixed(2)}` : '';
                                        return (
                                            <span key={i} className='flex items-center gap-2 uppercase text-d_notificacao_sucesso'>
                                                <CiSquarePlus size={20} />
                                                {nome} {valor && <span className='text-xs text-gray-400'>{valor}</span>}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className='col-span-1 text-right flex items-center justify-end gap-2'>
                                <button
                                    className="px-2 py-1 rounded bg-d_primary text-white hover:bg-d_primary/80"
                                    onClick={() => alterarQuantidade(index, 'decrementar')}
                                >
                                    -
                                </button>
                                <span className='text-xl'>{item.quantidade}</span>
                                <button
                                    className="px-2 py-1 rounded bg-d_primary text-white hover:bg-d_primary/80"
                                    onClick={() => alterarQuantidade(index, 'incrementar')}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div className='col-span-2 flex flex-row items-end'>
                            {(() => {
                                const adicionaisValorTotal = item.adicionar.reduce((total, adicional) => {
                                    if (typeof adicional === 'object' && adicional.valor) {
                                        return total + adicional.valor;
                                    }
                                    return total;
                                }, 0);

                                const valorBaseUnitario = item.valor + adicionaisValorTotal;
                                const valorComDescontoUnitario = item.desconto > 0
                                    ? valorBaseUnitario - item.desconto
                                    : valorBaseUnitario;
                                const valorTotal = valorComDescontoUnitario * item.quantidade;
                                const valorTotalOriginal = valorBaseUnitario * item.quantidade;

                                return item.desconto > 0 ? (
                                    <div className="flex flex-col items-end">
                                        <span className="text-md text-d_primary line-through ">
                                            R$ {valorTotalOriginal.toFixed(2)}
                                        </span>
                                        <span className="text-xl text-d_notificacao_sucesso">
                                            R$ {valorTotal.toFixed(2)}
                                        </span>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-end">
                                        <span className="text-xl">
                                            R$ {valorTotal.toFixed(2)}
                                        </span>
                                    </div>
                                );
                            })()}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default React.memo(CarrinhoItens);
