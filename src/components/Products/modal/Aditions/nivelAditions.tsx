import React from 'react'
import { Circle } from 'lucide-react'

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

  // Níveis com cores e ícones
  const niveis = [
    { nome: 'Delicado', cor: 'text-gray-400' },
    { nome: 'Leve', cor: 'text-green-400' },
    { nome: 'Médio', cor: 'text-yellow-500' },
    { nome: 'Marcante', cor: 'text-orange-500' },
    { nome: 'Intenso', cor: 'text-red-600' },
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
        {niveis.map(({ nome, cor }) => {
          const isSelected = nivelSelecionado === nome
          return (
            <button
              key={nome}
              onClick={() => handleSelect(nome)}
              className={`flex-1 min-w-[120px] flex justify-between items-center p-4 rounded-xl border cursor-pointer transition
                ${isSelected ? 'border-d_primary bg-gray-100' : 'border-gray-200 bg-white'}
                hover:border-blue-400
              `}
            >
              <span className="font-semibold">{nome}</span>
              <Circle className={`${cor} w-5 h-5`} />
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default React.memo(NivelSelector)
