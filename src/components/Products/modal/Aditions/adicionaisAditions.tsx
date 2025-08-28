import React from 'react'
import { Checkbox } from 'antd'
import { PlusCircle, Plus, Minus } from 'lucide-react'

interface IComposicao {
  id: string
  item_nome: string
  preco_extra: string
  quantidade?: string
  tipo?: string
}

interface AdicionaisProps {
  composicoes: IComposicao[]
  adicionarSelecionado: { id: string; nome: string; preco: number; quantidade: number }[]
  setAdicionarSelecionado: (items: { id: string; nome: string; preco: number; quantidade: number }[]) => void
}

const Adicionais: React.FC<AdicionaisProps> = ({ composicoes, adicionarSelecionado, setAdicionarSelecionado }) => {
  const adicionais = composicoes.filter(c => c.tipo === 'AD')

  if (!adicionais.length) return null

  return (
    <div className="mb-4">
      <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
        <PlusCircle className="w-5 h-5 text-green-500" />
        Peça também
      </h3>
      <div className="flex flex-col gap-2 max-h-[250px] overflow-y-auto pr-2">
        {adicionais.map((comp) => {
          const selecionado = adicionarSelecionado.find(a => a.id === comp.id)
          const isChecked = Boolean(selecionado)

          return (
            <div
              key={comp.id}
              className={`flex items-center justify-between p-2 rounded-lg shadow border transition 
                ${isChecked ? 'bg-green-100 border-green-400' : 'bg-white border-gray-200'}`}
            >
              <Checkbox
                checked={isChecked}
                onChange={(e) => {
                  if (e.target.checked) {
                    setAdicionarSelecionado([
                      ...adicionarSelecionado,
                      {
                        id: comp.id,
                        nome: comp.item_nome,
                        preco: parseFloat(comp.preco_extra),
                        quantidade: 1,
                      },
                    ])
                  } else {
                    setAdicionarSelecionado(adicionarSelecionado.filter(a => a.id !== comp.id))
                  }
                }}
                className="font-semibold text-gray-800 flex-1"
              >

                {comp.item_nome}{' '}
                <br />

                <span className="text-green-600 font-medium">
                  R$ {parseFloat(comp.preco_extra).toFixed(2)}

                </span>
                <span><div className='flex items-center flex-col'>


                  {isChecked && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setAdicionarSelecionado((prev) =>
                            prev.map((a) =>
                              a.id === comp.id
                                ? { ...a, quantidade: Math.max(a.quantidade - 1, 1) }
                                : a,
                            ),
                          )
                        }}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition"
                      >
                        <Minus className="w-4 h-4 text-gray-700" />
                      </button>

                      <span className="font-bold">{selecionado?.quantidade}</span>

                      <button
                        onClick={() => {
                          setAdicionarSelecionado((prev) =>
                            prev.map((a) =>
                              a.id === comp.id
                                ? { ...a, quantidade: Math.min(a.quantidade + 1, parseInt(comp.quantidade || '5')) }
                                : a,
                            ),
                          )
                        }}
                        className={`w-8 h-8 flex items-center justify-center rounded-full text-white transition 
                      ${selecionado?.quantidade >= parseInt(comp.quantidade || '5')
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-green-500 hover:bg-green-600'}`}
                        disabled={selecionado?.quantidade >= parseInt(comp.quantidade || '5')}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div></span>
              </Checkbox>

            </div>
          )
        })}
      </div>
    </div>
  )
}

export default React.memo(Adicionais)
