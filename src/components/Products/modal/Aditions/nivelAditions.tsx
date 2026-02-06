import React from 'react'
import { Star } from 'lucide-react'

interface INivelSelectorProps {
  composicoes: { id: string; item_nome: string; tipo: string }[]
  adicionarSelecionado: { id: string; nome: string; preco: number; quantidade: number; tipo: string; nivel?: string }[]
  setAdicionarSelecionado: (items: typeof adicionarSelecionado) => void
}

const NivelSelector: React.FC<INivelSelectorProps> = ({ composicoes, adicionarSelecionado, setAdicionarSelecionado }) => {
  const nvComposicao = composicoes.find(c => c.tipo === 'NV')
  if (!nvComposicao) return null

  const nomeOriginal = nvComposicao.item_nome
  const nivelSelecionado = adicionarSelecionado.find(a => a.tipo === 'NV')?.nivel || null

  const niveis = [
    { nome: "Suave", cor: "#A8E05F", barras: 1 },
    { nome: "Médio", cor: "#FFB347", barras: 2 },
    { nome: "Forte", cor: "#E63946", barras: 3 },
    { nome: "Explosivo", cor: "#8B0000", barras: 4 },
  ]

  const handleSelect = (nivel: string) => {
    if (!nomeOriginal) return
    setAdicionarSelecionado([
      ...adicionarSelecionado.filter(a => a.tipo !== 'NV'),
      {
        id: `NV-${nivel}`,
        nome: `${nomeOriginal} - ${nivel}`,
        preco: 0,
        quantidade: 1,
        tipo: 'NV',
        nivel,
      },
    ])
  }

  return (
    <div className="mb-4">
      <h3 className="text-lg font-bold text-gray-900 mb-2">{nomeOriginal || 'Nível'}</h3>
      <div className="flex flex-wrap gap-2">
        {niveis.map(({ nome, cor, barras }) => {
          const isSelected = nivelSelecionado === nome
          return (
            <button
              key={nome}
              onClick={() => handleSelect(nome)}
              className={`flex-1 min-w-[140px] flex justify-between items-center p-4 rounded-xl border cursor-pointer transition
                ${isSelected ? 'border-d_primary bg-gray-100' : 'border-gray-200 bg-white'}
                hover:border-blue-400
              `}
            >
              <span className="font-semibold">{nome}</span>
              <div className="flex gap-1">
                {[...Array(barras)].map((_, idx) => (
                  <Star key={idx} className="w-2 h-2" style={{ color: cor }} />
                ))}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default React.memo(NivelSelector)
