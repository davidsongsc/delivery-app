import React from 'react'
import Image from 'next/image'
import { formatPhoneNumberWeb } from '@/utils/phoneNumber'
import { formatCNPJ } from '@/utils/formatCnpj'
import { ILoja } from '@/interfaces/ILoja'
import { ICliente } from '@/interfaces/ICliente'
import { IPedido } from '@/interfaces/IPedido'
import { useLojaStore } from '@/store/useLojaStore'
import { useLoja } from '@/contexts/LojaContext'
import { X } from 'lucide-react'

interface ICarrinhoHeaderProps {
  loja: ILoja
  pedido: IPedido
  cliente: ICliente
}

const CarrinhoHeader: React.FC<ICarrinhoHeaderProps> = ({
  loja,
  cliente,
  pedido
}) => {
  const { loja: lojaStore } = useLojaStore()
  const { corporation } = useLoja()
  const corporationReduce = corporation.result[0]

  return (
    <div className="bg-white">
      {/* Topo */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          {corporationReduce?.logo_url && (
            <Image
              src={corporationReduce.logo_url}
              alt={corporationReduce.nome}
              width={48}
              height={48}
              className="rounded-full border"
            />
          )}
          <div>
            <p className="font-bold text-lg">{corporationReduce?.nome}</p>
            <p className="text-xs text-gray-500">
              CNPJ {formatCNPJ(corporationReduce?.cnpj)}
            </p>
          </div>
        </div>
        <button className="p-2 rounded-full hover:bg-gray-100 transition">
          <X size={20} />
        </button>
      </div>

      {/* Telefones */}
      {corporationReduce.telefones?.length > 0 && (
        <div className="flex gap-2 flex-wrap px-4 pb-2">
          {corporationReduce.telefones.slice(0, 2).map((telObj, index) => {
            const [label, number] = Object.entries(telObj)[0]
            return (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                {label}: {formatPhoneNumberWeb(number)}
              </span>
            )
          })}
        </div>
      )}

      {/* Dados do Pedido */}
      <div className="px-4 py-3 border-t border-gray-100 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Pedido</span>
          <span className="font-bold">#{pedido.id}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Cliente</span>
          <span className="font-bold">{cliente?.nome}</span>
        </div>
        <div>
          <span className="text-gray-500">Endereço</span>
          <p className="font-bold text-sm">
            {cliente.endereco.rua}, {cliente.endereco.bairro}
          </p>
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>Data: {pedido.data}</span>
          <span>Hora: {pedido.hora}</span>
        </div>
      </div>
    </div>
  )
}

export default React.memo(CarrinhoHeader)
