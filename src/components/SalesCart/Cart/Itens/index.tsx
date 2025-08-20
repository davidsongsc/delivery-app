import React from 'react'
import Image from 'next/image'
import { CiSquareRemove, CiSquarePlus } from 'react-icons/ci'
import { useDeliveryStore } from '@/store/deliveryStore'

const CarrinhoItens: React.FC = () => {
  const { itensPedido, alterarQuantidade } = useDeliveryStore()

  return (
    <div className="space-y-4">
      {itensPedido.map((item, index) => {
        const adicionaisValorTotal = item.adicionar.reduce((total, adicional) => {
          if (typeof adicional === 'object' && adicional.valor) {
            return total + adicional.valor
          }
          return total
        }, 0)

        const valorBaseUnitario = item.valor + adicionaisValorTotal
        const valorComDescontoUnitario =
          item.desconto > 0 ? valorBaseUnitario - item.desconto : valorBaseUnitario
        const valorTotal = valorComDescontoUnitario * item.quantidade
        const valorTotalOriginal = valorBaseUnitario * item.quantidade

        return (
          <div
            key={index}
            className="flex items-start bg-white rounded-2xl shadow-md p-3"
          >
            <div className="flex-shrink-0">
              <Image
                src={item.imagem}
                width={90}
                height={90}
                alt={item.nome}
                className="rounded-xl object-cover"
              />
            </div>

            <div className="flex-1 px-3 flex flex-col justify-between">
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

              {(item.remover.length > 0 || item.adicionar.length > 0) && (
                <div className="mt-1 text-sm space-y-1">
                  {item.remover.length > 0 && (
                    <div className="flex flex-wrap gap-2 text-red-500 font-semibold">
                      {item.remover.map((remover: string, i: number) => (
                        <span key={i} className="flex items-center gap-1 uppercase">
                          <CiSquareRemove size={16} /> {remover}
                        </span>
                      ))}
                    </div>
                  )}

                  {item.adicionar.length > 0 && (
                    <div className="flex flex-wrap gap-2 text-green-600 font-semibold">
                      {item.adicionar.map((adicionar: any, i: number) => {
                        const nome =
                          typeof adicionar === 'string'
                            ? adicionar
                            : adicionar.item
                        const valor =
                          typeof adicionar === 'object'
                            ? `+R$ ${adicionar.valor.toFixed(2)}`
                            : ''
                        return (
                          <span
                            key={i}
                            className="flex items-center gap-1 uppercase"
                          >
                            <CiSquarePlus size={16} /> {nome}{' '}
                            {valor && (
                              <span className="text-xs text-gray-400">{valor}</span>
                            )}
                          </span>
                        )
                      })}
                    </div>
                  )}
                </div>
              )}

              <div className="mt-2 flex items-center gap-2">
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
