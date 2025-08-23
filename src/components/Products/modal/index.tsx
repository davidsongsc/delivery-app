import React, { useEffect, useState } from 'react'
import { Modal, Checkbox, Radio } from 'antd'
import Image from 'next/image'
interface IComposicao {
  id: string
  item: string
  item_nome: string
  tipo: string // AD, RM, FX
  quantidade: number
  preco_extra: string
}

interface IProduto {
  id: string
  imagens: {
    id: string
    imagem_url: string
    descricao: string | null
    ordem: number
  }[]
  nome: string
  descricao: string
  preco: string
  composicoes?: IComposicao[]
}

interface ProductModalProps {
  modalAberto: boolean;
  setModalAberto: (open: boolean) => void;
  produtoSelecionado: IProduto | null;
  confirmarAdicao: (item: {
    id: string;
    nome: string;
    valor: number;
    desconto: number;
    quantidade: number;
    adicionar: { id: string; quantidade: number; preco_extra: number }[];
    remover: string[];
  }) => void;
  adicionarSelecionado: { id: string; quantidade: number; preco_extra: number }[];
  setAdicionarSelecionado: (items: { id: string; quantidade: number; preco_extra: number }[]) => void;
  removerSelecionado: string[];
  setRemoverSelecionado: (items: string[]) => void;
}


const ProductModal: React.FC<ProductModalProps> = ({
  modalAberto,
  setModalAberto,
  produtoSelecionado,
  confirmarAdicao,
  adicionarSelecionado,
  setAdicionarSelecionado,
  removerSelecionado,
  setRemoverSelecionado,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [nvSelecionado, setNvSelecionado] = useState<string | null>(null)

  useEffect(() => {
    if (modalAberto) setCurrentImageIndex(0)
  }, [modalAberto, produtoSelecionado])

  const currentImageUrl =
    produtoSelecionado?.imagens[currentImageIndex]?.imagem_url ||
    'https://placehold.co/800x600/CCCCCC/FFFFFF?text=No+Image'

  return (
    <Modal
      open={modalAberto}
      onCancel={() => setModalAberto(false)}
      footer={null}
      width={window.innerWidth < 768 ? '100%' : 800}
      className="rounded-2xl overflow-hidden top-1 md:top-16"
      styles={{ content: { padding: 0, borderRadius: '16px', overflow: 'hidden' } }}
    >
      {produtoSelecionado && (
        <div className="bg-white flex flex-col md:flex-row h-full max-h-[85vh]">
          {/* Imagem */}
          <div className="relative w-full md:w-1/2  md:h-auto overflow-hidden">
            <Image
              src={currentImageUrl}
              alt={produtoSelecionado.nome}
              width={400}
              height={400}
              className="object-contain"
            />
            <p className="text-gray-600 text-base mb-2 p-4">
              {produtoSelecionado.descricao || 'Nenhuma descrição disponível.'}
            </p>
          </div>

          {/* Conteúdo */}
          <div className="flex-1 flex flex-col p-4 md:pX-6 overflow-y-auto">
            <h2 className="text-4xl font-extrabold text-gray-900">{produtoSelecionado.nome}</h2>

            <p className="text-3xl font-extrabold text-d_primary mb-4">
              R${' '}
              {parseFloat(produtoSelecionado.preco).toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
              })}
            </p>

            {/* Adicionais */}
            {produtoSelecionado.composicoes?.some((c) => c.tipo === 'AD') && (
              <div className="mb-4 ">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Adicionais</h3>
                <div className="flex flex-col gap-2 max-h-[250px] overflow-y-auto pr-2">
                  {produtoSelecionado.composicoes
                    .filter((c) => c.tipo === 'AD')
                    .map((comp) => {
                      const selecionado = adicionarSelecionado.find((a) => a.id === comp.id)
                      const isChecked = Boolean(selecionado)

                      return (
                        <div
                          key={comp.id}
                          className={`flex items-center justify-between p-3 rounded-xl border transition
                            ${isChecked ? 'bg-green-100 border-green-400' : 'bg-white border-gray-200'}
                          `}
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
                                setAdicionarSelecionado(
                                  adicionarSelecionado.filter((a) => a.id !== comp.id),
                                )
                              }
                            }}
                            className="font-semibold text-gray-800"
                          >
                            {comp.item_nome}{' '}
                            <span className="text-green-600">
                              + R$ {parseFloat(comp.preco_extra).toFixed(2)}
                            </span>
                          </Checkbox>

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
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200"
                              >
                                –
                              </button>
                              <span className="font-bold">{selecionado?.quantidade}</span>
                              <button
                                onClick={() => {
                                  setAdicionarSelecionado((prev) =>
                                    prev.map((a) =>
                                      a.id === comp.id ? { ...a, quantidade: a.quantidade + 1 } : a,
                                    ),
                                  )
                                }}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-green-500 text-white"
                              >
                                +
                              </button>
                            </div>
                          )}
                        </div>
                      )
                    })}
                </div>
              </div>
            )}
            {produtoSelecionado.composicoes?.some(c => c.tipo === 'NV') && (
              <div className="mb-4">
                {(() => {
                  const nomeOriginal = produtoSelecionado.composicoes?.find(c => c.tipo === 'NV')?.item_nome
                  return (
                    <>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {nomeOriginal || 'Nível'}
                      </h3>
                      <Radio.Group
                        className="flex flex-col gap-2"
                        value={adicionarSelecionado.find(a => a.tipo === 'NV')?.nivel || null}
                        onChange={(e) => {
                          const nivelSelecionado = e.target.value
                          if (!nomeOriginal) return
                          setAdicionarSelecionado([
                            ...adicionarSelecionado.filter(a => a.tipo !== 'NV'),
                            {
                              id: `NV-${nivelSelecionado}`,
                              nome: `${nomeOriginal} - ${nivelSelecionado}`,
                              preco: 0,
                              quantidade: 1,
                              tipo: 'NV',
                              nivel: nivelSelecionado,
                            },
                          ])
                        }}
                      >
                        {['Light', 'Medium', 'Hot'].map((nivel) => (
                          <Radio
                            key={nivel}
                            value={nivel}
                            className="p-3 rounded-xl border border-gray-200 hover:border-blue-400 transition"
                          >
                            <span className="font-semibold">{nivel}</span>
                          </Radio>
                        ))}
                      </Radio.Group>
                    </>
                  )
                })()}
              </div>
            )}


            {produtoSelecionado.composicoes?.some(c => c.tipo === 'PT') && (
              <div className="mb-4">
                {(() => {
                  const nomeOriginal = produtoSelecionado.composicoes?.find(c => c.tipo === 'PT')?.item_nome
                  return (
                    <>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {nomeOriginal || 'Ponto da Carne'}
                      </h3>
                      <Radio.Group
                        className="flex flex-col gap-2"
                        value={adicionarSelecionado.find(a => a.tipo === 'PT')?.nivel || null}
                        onChange={(e) => {
                          const pontoSelecionado = e.target.value
                          if (!nomeOriginal) return
                          setAdicionarSelecionado([
                            ...adicionarSelecionado.filter(a => a.tipo !== 'PT'),
                            {
                              id: `PT-${pontoSelecionado}`,
                              nome: `${nomeOriginal} - ${pontoSelecionado}`,
                              preco: 0,
                              quantidade: 1,
                              tipo: 'PT',
                              nivel: pontoSelecionado,
                            },
                          ])
                        }}
                      >
                        {['Mal passada', 'Ponto Mal passada', 'Ao Ponto', 'Ponto Bem Passada', 'Bem Passada'].map((ponto) => (
                          <Radio
                            key={ponto}
                            value={ponto}
                            className="p-3 rounded-xl border border-gray-200 hover:border-blue-400 transition"
                          >
                            <span className="font-semibold">{ponto}</span>
                          </Radio>
                        ))}
                      </Radio.Group>
                    </>
                  )
                })()}
              </div>
            )}

            {produtoSelecionado.composicoes?.some(c => c.tipo === 'RM' || c.tipo === 'FX') && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Remover da composição</h3>
                <div className="flex flex-col gap-2 max-h-[250px] overflow-y-auto pr-2">
                  {produtoSelecionado.composicoes
                    .filter(c => c.tipo === 'RM' || c.tipo === 'FX')
                    .map(comp => {
                      const selecionado = removerSelecionado.find(r => r.id === comp.id)
                      const isChecked = Boolean(selecionado)

                      return (
                        <div
                          key={comp.id}
                          className={`p-3 rounded-xl border transition cursor-pointer 
                ${isChecked ? 'bg-red-100 border-red-400 line-through' : 'bg-white border-gray-200'}
              `}
                          onClick={() => {
                            if (isChecked) {
                              setRemoverSelecionado(removerSelecionado.filter(r => r.id !== comp.id))
                            } else {
                              setRemoverSelecionado([...removerSelecionado, {
                                id: comp.id,
                                nome: comp.item_nome,
                                preco: parseFloat(comp.preco_extra) || 0
                              }])
                            }
                          }}
                        >
                          {comp.item_nome} {isChecked && `- R$ ${parseFloat(comp.preco_extra || '0').toFixed(2)}`}
                        </div>
                      )
                    })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CTA fixo */}
      <div className="sticky bottom-0 bg-white border-t p-4">
        <button
          onClick={confirmarAdicao}
          className="w-full bg-d_primary text-white py-4 rounded-full font-bold text-lg hover:bg-d_primary/90 active:scale-95 transition"
        >
          Adicionar ao Pedido
        </button>
      </div>
    </Modal>
  )
}

export default React.memo(ProductModal)
