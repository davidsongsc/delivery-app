import React from 'react'
import { cliente, loja, pedido } from '@/components/serverside'
import CarrinhoTotalVenda from './TotalSale'
import CarrinhoItens from './Itens'
import CarrinhoHeader from './header'
import { useBreakpoint } from '@/utils/useBreakpoint'
import { IPedido } from '@/interfaces/IPedido'

const CarrinhoPedido: React.FC = () => {
  const pedidoCorrigido: IPedido = {
    ...pedido,
    itens: pedido.itens.map(item => ({
      ...item,
      adicionar: item.adicionar.map(ad =>
        typeof ad === 'string' ? { item: ad, valor: 0 } : ad
      )
    }))
  }

  return (
    <div className="fixed top-0 right-0 h-full w-full md:w-[420px] bg-white shadow-2xl rounded-l-2xl flex flex-col animate-slide-in z-50">
      {/* Header */}
      <div className="border-b border-gray-200">
        <CarrinhoHeader loja={loja} cliente={cliente} pedido={pedidoCorrigido} />
      </div>

      {/* Lista de Itens */}
      <div
        className={`flex-1 px-4 overflow-y-auto scroll-smooth scroll-bar ${
          useBreakpoint() === 'mobile' ? 'h-[40vh]' : 'h-[55vh]'
        }`}
      >
        <CarrinhoItens />
      </div>

      {/* Resumo Final */}
      <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl shadow-inner">
        <CarrinhoTotalVenda />

        <button className="w-full mt-4 py-3 bg-gradient-to-r from-d_primary to-d_primary/90 text-white font-bold text-lg rounded-full shadow-md hover:scale-[1.02] active:scale-[0.98] transition-transform">
          Finalizar Pedido
        </button>
      </div>
    </div>
  )
}

export default React.memo(CarrinhoPedido)
