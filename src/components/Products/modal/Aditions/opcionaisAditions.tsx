import React from 'react'
import { Checkbox, Button } from 'antd'
import { Plus, Minus } from 'lucide-react'

interface IComposicao {
    id: string
    item_nome: string
    preco_extra: string
    quantidade?: string // máximo permitido por item
    tipo?: string
}

interface OpcionaisProps {
    composicoes: IComposicao[]
    opcionaisSelecionados: { id: string; nome: string; preco: number; quantidade: number }[]
    setOpcionaisSelecionados: (items: { id: string; nome: string; preco: number; quantidade: number }[]) => void
    limiteTotal?: number // total de itens comprados
}

const OpcionaisSelector: React.FC<OpcionaisProps> = ({
    composicoes,
    opcionaisSelecionados = [],
    setOpcionaisSelecionados,
    limiteTotal = 1,
}) => {
    const opcionais = composicoes.filter(c => c.tipo === 'OP')
    if (!opcionais.length) return null

    const totalSelecionados = opcionaisSelecionados.reduce((acc, cur) => acc + cur.quantidade, 0)
    console.log('composicoes', composicoes, 'selecionados', opcionaisSelecionados, 'total', totalSelecionados)
    const adicionarOpcional = (comp: IComposicao) => {
        if (totalSelecionados >= limiteTotal) return // só bloqueia se já chegou no limite total
        setOpcionaisSelecionados(prev => {
            if (prev.find(a => a.id === comp.id)) return prev
            return [
                ...prev,
                {
                    id: comp.id,
                    nome: comp.item_nome,
                    preco: parseFloat(comp.preco_extra),
                    quantidade: 1,
                }
            ]
        })
    }
    const removerOpcional = (id: string) => {
        setOpcionaisSelecionados(prev => prev.filter(a => a.id !== id))
    }

    const alterarQuantidade = (id: string, delta: number, max?: number) => {
        setOpcionaisSelecionados(prev => {
            const total = prev.reduce((acc, cur) => acc + cur.quantidade, 0)
            return prev.map(a => {
                if (a.id === id) {
                    const maxQtd = max || parseInt(a.quantidade.toString()) || limiteTotal
                    let novaQtd = a.quantidade + delta
                    if (delta > 0 && total >= limiteTotal) return a
                    novaQtd = Math.max(1, Math.min(novaQtd, maxQtd))
                    return { ...a, quantidade: novaQtd }
                }
                return a
            })
        })
    }

    return (
        <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Escolha seus opcionais</h3>
            <div className="flex flex-col gap-2 max-h-[250px] overflow-y-auto pr-2">
                {opcionais.map(comp => {
                    const selecionado = opcionaisSelecionados.find(a => a.id === comp.id)
                    const isChecked = Boolean(selecionado)
                    const maxQtd = parseInt(comp.quantidade || limiteTotal.toString())

                    return (
                        <div
                            key={comp.id}
                            className={`flex items-center justify-between p-2 rounded-lg shadow border transition 
                                ${isChecked ? 'bg-yellow-100 border-yellow-400' : 'bg-white border-gray-200'}`}
                        >
                            <Checkbox
                                checked={isChecked}
                                onChange={e => {
                                    if (e.target.checked) adicionarOpcional(comp)
                                    else removerOpcional(comp.id)
                                }}
                                disabled={!isChecked && totalSelecionados + 1 > limiteTotal} // só bloqueia se selecionar este ultrapassaria o limite
                            >

                                {comp.item_nome} <br />
                                <span className="text-green-600 font-medium">R$ {parseFloat(comp.preco_extra).toFixed(2)}</span>

                                {isChecked && (
                                    <div className="flex items-center gap-2 mt-1">
                                        <Button size="small" onClick={() => alterarQuantidade(comp.id, -1)}>
                                            <Minus size={14} />
                                        </Button>
                                        <span className="font-bold">{selecionado?.quantidade}</span>
                                        <Button
                                            size="small"
                                            onClick={() => alterarQuantidade(comp.id, 1, maxQtd)}
                                            disabled={totalSelecionados >= limiteTotal}
                                        >
                                            <Plus size={14} />
                                        </Button>
                                    </div>
                                )}
                            </Checkbox>
                        </div>
                    )
                })}
            </div>
            {totalSelecionados >= limiteTotal && (
                <p className="text-red-500 text-sm mt-1">Você atingiu o limite de {limiteTotal} opcionais</p>
            )}
        </div>
    )
}

export default React.memo(OpcionaisSelector)
