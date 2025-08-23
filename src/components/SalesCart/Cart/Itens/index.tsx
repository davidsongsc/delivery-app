import React from 'react'
import Image from 'next/image'
import { CiSquareRemove, CiSquarePlus } from 'react-icons/ci'
import { useDeliveryStore } from '@/store/deliveryStore'

const CarrinhoItens: React.FC = () => {
  const { itensPedido, alterarQuantidade } = useDeliveryStore()
  console.log('Itens do pedido:', itensPedido)
  return (
    <div className="space-y-4">
      {itensPedido.map((item, index) => {
        const removerSelecionados = item.remover || []

        const adicionaisSelecionados = item.adicionar || []

        const adicionaisValorTotal = adicionaisSelecionados.reduce(
          (total: number, comp: any) => total + (parseFloat(comp.preco) || 0) * (comp.quantidade || 1),
          0
        )

        const valorBaseUnitario = item.valor + adicionaisValorTotal
        const valorComDescontoUnitario =
          item.desconto > 0 ? valorBaseUnitario - item.desconto : valorBaseUnitario
        const valorTotal = valorComDescontoUnitario * item.quantidade
        const valorTotalOriginal = valorBaseUnitario * item.quantidade

        return (
          <div
            key={index}
            className="flex items-start bg-white rounded-2xl shadow-md p-4"
          >
            {/* Imagem */}
            <div className="flex-shrink-0">
              <Image
                src={item.imagem}
                width={90}
                height={90}
                alt={item.nome}
                className="rounded-xl object-cover"
              />
            </div>

            {/* Conteúdo */}
            <div className="flex-1 px-3 flex flex-col justify-between">
              {/* Cabeçalho */}
              <div className="flex justify-between items-start">
                <span className="font-bold text-lg">{item.nome}</span>
                {item.desconto > 0 ? (
                  <div className="text-right">
                    <span className="block text-sm text-gray-400 line-through">
                      R$ {valorTotalOriginal.toFixed(2)}
                    </span>
                    <span className="block text-xl text-green-600 font-bold">
                      R$ {valorTotal.toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <span className="text-xl font-bold text-d_primary">
                    R$ {valorTotal.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Adicionais e Remoções */}
              {(removerSelecionados.length > 0 || adicionaisSelecionados.length > 0) && (
                <div className="mt-2 text-sm space-y-2">
                  {/* Removidos */}
                  {removerSelecionados.length > 0 && (
                    <div className="flex flex-wrap gap-2 text-red-500 font-semibold">
                      {removerSelecionados.map((comp: any) => (
                        <span key={comp.id} className="flex items-center gap-1 uppercase line-through">
                          <CiSquareRemove size={16} /> {comp.nome} {comp.preco ? `- R$ ${parseFloat(comp.preco).toFixed(2)}` : ''}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Adicionados */}
                  {adicionaisSelecionados.length > 0 && (
                    <div className="flex flex-wrap gap-2 text-green-600 font-semibold">
                      {adicionaisSelecionados.map((comp: any) => (
                        <span key={comp.id} className="flex items-center gap-1 uppercase">
                          <CiSquarePlus size={16} /> {comp.nome}
                          {comp.preco ? <span className="text-xs text-gray-400">+R$ {parseFloat(comp.preco).toFixed(2)}</span> : null}
                          {comp.quantidade > 1 && <span className="ml-1 text-xs text-gray-500">x{comp.quantidade}</span>}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Quantidade */}
              <div className="mt-3 flex items-center gap-2">
                <button
                  onClick={() => alterarQuantidade(index, 'decrementar')}
                  className="w-8 h-8 rounded-full bg-gray-200 text-lg font-bold flex items-center justify-center hover:bg-gray-300"
                >
                  –
                </button>
                <span className="text-lg font-bold w-6 text-center">
                  {item.quantidade}
                </span>
                <button
                  onClick={() => alterarQuantidade(index, 'incrementar')}
                  className="w-8 h-8 rounded-full bg-d_primary text-white text-lg font-bold flex items-center justify-center hover:bg-d_primary/80"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default React.memo(CarrinhoItens)
