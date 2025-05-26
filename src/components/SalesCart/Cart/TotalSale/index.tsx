import React, { useState } from 'react';
import { useDeliveryStore } from '@/store/deliveryStore'; // 🚨 Certifique-se que esse caminho está certo
import { ICupom } from '@/interfaces/ICupom';
import { listaCupons } from '@/components/serverside';

const CarrinhoTotalVenda: React.FC = () => {
    const itensPedido = useDeliveryStore(state => state.itensPedido);
    const taxaEntrega = useDeliveryStore(state => state.taxaEntrega);

    const [cupom, setCupom] = useState('');
    const [cupomAplicado, setCupomAplicado] = useState<ICupom | null>(null);
    const [mensagem, setMensagem] = useState('');

    let totalOriginal = 0;
    let totalDescontos = 0;
    let totalFinal = 0;

    itensPedido.forEach(item => {
        const adicionaisValor = item.adicionar.reduce((total, adicional) => {
            return total + (typeof adicional === 'object' && adicional.valor ? adicional.valor : 0);
        }, 0);

        const baseUnitario = item.valor + adicionaisValor;
        const descontoUnitario = item.desconto || 0;

        const original = baseUnitario * item.quantidade;
        const final = (baseUnitario - descontoUnitario) * item.quantidade;
        const descontoTotal = descontoUnitario * item.quantidade;

        totalOriginal += original;
        totalDescontos += descontoTotal;
        totalFinal += final;
    });

    const aplicarCupom = () => {
        const encontrado = listaCupons.find(
            (c) => c.codigo.toLowerCase() === cupom.toLowerCase()
        );

        if (!encontrado) {
            setMensagem('Cupom inválido.');
            setCupomAplicado(null);
            return;
        }

        if (encontrado.usosRestantes <= 0) {
            setMensagem('Cupom esgotado.');
            setCupomAplicado(null);
            return;
        }

        setCupomAplicado(encontrado);

        const tipoMsg =
            encontrado.tipo === 'valor'
                ? `R$ ${encontrado.valor} de desconto.`
                : `${encontrado.valor}% de desconto.`;

        setMensagem(`Cupom aplicado: ${tipoMsg}`);
    };

    const removerCupom = () => {
        setCupom('');
        setCupomAplicado(null);
        setMensagem('');
    };

    let descontoCupomCalculado = 0;
    if (cupomAplicado) {
        if (cupomAplicado.tipo === 'valor') {
            descontoCupomCalculado = cupomAplicado.valor;
        } else if (cupomAplicado.tipo === 'porcentagem') {
            descontoCupomCalculado = totalFinal * (cupomAplicado.valor / 100);
        }
    }

    const totalFinalComCupom = Math.max(totalFinal - descontoCupomCalculado + taxaEntrega, 0);

    return (
        <div className='space-y-4 text-right'>
            {/* Área de cupom */}
            <div className='text-left'>
                <label htmlFor="cupom" className="block text-sm font-medium text-gray-700 mb-1">Cupom </label>
                <div className="flex gap-2">
                    <input
                        id="cupom"
                        type="text"
                        value={cupom}
                        onChange={(e) => setCupom(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-1 w-full"
                        placeholder="Digite o cupom"
                        disabled={!!cupomAplicado}
                    />
                    <button
                        onClick={aplicarCupom}
                        className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 disabled:opacity-50"
                        disabled={!!cupomAplicado}
                    >
                        Aplicar
                    </button>
                    {cupomAplicado && (
                        <button
                            onClick={removerCupom}
                            className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                        >
                            Remover
                        </button>
                    )}
                </div>

                <p className={`mt-1 text-sm ${cupomAplicado ? 'text-green-600' : 'text-red-600'}`}>
                    {mensagem}
                </p>
            </div>

            {/* Totais */}
            <div className='space-y-1'>
                <div className='flex justify-between text-gray-600 text-xl'>
                    <span>Total Bruto:</span>
                    <span>R$ {totalOriginal.toFixed(2)}</span>
                </div>
                <div className='flex justify-between text-d_primary text-xl'>
                    <span>Descontos:</span>
                    <span>- R$ {totalDescontos.toFixed(2)}</span>
                </div>

                {cupomAplicado && (
                    <div className='flex justify-between text-d_primary text-xl'>
                        <div>
                            <span>Cupom:</span>
                            <span className='text-d_tx_primary'> {cupomAplicado.codigo}</span>
                        </div>
                        <span>- R$ {descontoCupomCalculado}</span>
                    </div>
                )}

                <div className='flex justify-between text-blue-800 text-xl'>
                    <span>Taxa de Entrega:</span>
                    <span>R$ {taxaEntrega}</span>
                </div>

                <div className='flex justify-between text-lg text-d_notificacao_sucesso border-t pt-1 border-gray-400 2xl:text-xl'>
                    <span>Total a Pagar:</span>
                    <span>R$ {totalFinalComCupom.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};

export default React.memo(CarrinhoTotalVenda);
