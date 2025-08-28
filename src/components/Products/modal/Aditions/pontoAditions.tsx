import React from 'react'
import { Radio } from 'antd'

interface IPontoSelectorProps {
  composicoes: { id: string; item_nome: string; tipo: string }[]
  adicionarSelecionado: { id: string; nome: string; preco: number; quantidade: number; tipo: string; nivel?: string }[]
  setAdicionarSelecionado: (items: typeof adicionarSelecionado) => void
}

const PontoSelector: React.FC<IPontoSelectorProps> = ({ composicoes, adicionarSelecionado, setAdicionarSelecionado }) => {
  const ptComposicao = composicoes.find(c => c.tipo === 'PT')
  if (!ptComposicao) return null

  const nomeOriginal = ptComposicao.item_nome
  const pontoSelecionado = adicionarSelecionado.find(a => a.tipo === 'PT')?.nivel || null

  const pontos = ['Mal Passada', 'Ponto Mal passada', 'Ao Ponto', 'Ponto Bem Passada', 'Bem Passada']

  return (
    <div className="mb-4">
      <h3 className="text-lg font-bold text-gray-900 mb-2">{nomeOriginal || 'Ponto da Carne'}</h3>
      <Radio.Group
        className="flex flex-col gap-2"
        value={pontoSelecionado}
        onChange={(e) => {
          const ponto = e.target.value
          if (!nomeOriginal) return
          setAdicionarSelecionado([
            ...adicionarSelecionado.filter(a => a.tipo !== 'PT'),
            {
              id: `PT-${ponto}`,
              nome: `${nomeOriginal} - ${ponto}`,
              preco: 0,
              quantidade: 1,
              tipo: 'PT',
              nivel: ponto,
            },
          ])
        }}
      >
        {pontos.map(ponto => (
          <Radio
            key={ponto}
            value={ponto}
            className="p-3 rounded-xl border border-gray-200 hover:border-blue-400 transition"
          >
            <span className="font-semibold">{ponto}</span>
          </Radio>
        ))}
      </Radio.Group>
    </div>
  )
}

export default React.memo(PontoSelector)
