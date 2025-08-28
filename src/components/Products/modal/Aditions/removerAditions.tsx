import React from 'react'
import { XCircle, MinusCircle } from 'lucide-react'

interface IRemoverComposicaoProps {
  composicoes: { id: string; item_nome: string; tipo: string; preco_extra?: string }[]
  removerSelecionado: { id: string; nome: string; preco: number }[]
  setRemoverSelecionado: (items: typeof removerSelecionado) => void
}

const RemoverComposicao: React.FC<IRemoverComposicaoProps> = ({
  composicoes,
  removerSelecionado,
  setRemoverSelecionado,
}) => {
  const comps = composicoes.filter(c => c.tipo === 'RM' || c.tipo === 'FX')
  if (!comps.length) return null

  return (
    <div>
      <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
        <MinusCircle className="w-5 h-5 text-red-500" />
        Retirar do Pedido
      </h3>
      <div className="flex flex-col gap-2 max-h-[250px] overflow-y-auto pr-2">
        {comps.map(comp => {
          const selecionado = removerSelecionado.find(r => r.id === comp.id)
          const isChecked = Boolean(selecionado)

          return (
            <div
              key={comp.id}
              className={`p-3 rounded-xl border transition cursor-pointer flex items-center justify-between
                ${isChecked ? 'bg-red-100 border-red-400 line-through' : 'bg-white border-gray-200'}`}
              onClick={() => {
                if (isChecked) {
                  setRemoverSelecionado(removerSelecionado.filter(r => r.id !== comp.id))
                } else {
                  setRemoverSelecionado([...removerSelecionado, {
                    id: comp.id,
                    nome: comp.item_nome,
                    preco: parseFloat(comp.preco_extra || '0'),
                  }])
                }
              }}
            >
              <span>{comp.item_nome}</span>
              {isChecked ? (
                <XCircle className="w-5 h-5 text-red-500" />
              ) : (
                <MinusCircle className="w-5 h-5 text-gray-400" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default React.memo(RemoverComposicao)
