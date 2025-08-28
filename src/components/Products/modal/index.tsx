import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'antd';
import Image from 'next/image';
import RemoverComposicao from '@/components/Products/modal/Aditions/removerAditions';
import PontoSelector from '@/components/Products/modal/Aditions/pontoAditions';
import NivelSelector from '@/components/Products/modal/Aditions/nivelAditions';
import Adicionais from '@/components/Products/modal/Aditions/adicionaisAditions';
import DescricaoStyles from '@/components/MiniComponents/DescricaoStyles';
import { CheckCircle, Circle } from 'lucide-react';
import OpcionaisSelector from '@/components/Products/modal/Aditions/opcionaisAditions';
interface IComposicao {
  id: string
  item: string
  item_nome: string
  tipo: string // AD, RM, FX, NV, PT
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

  opcionaisSelecionados: { id: string; nome: string; preco: number; quantidade: number }[]; // novo
  setOpcionaisSelecionados: (items: { id: string; nome: string; preco: number; quantidade: number }[]) => void; // novo
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
  opcionaisSelecionados,
  setOpcionaisSelecionados,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const steps = [
    ...produtoSelecionado?.composicoes
      ?.filter(c => ['NV', 'PT', 'OP'].includes(c.tipo))
      .map(c => ({ tipo: c.tipo, nome: c.item_nome, id: c.id })) || [],
    { tipo: 'RM', nome: 'Retirar do Pedido' },
    { tipo: 'RES', nome: 'Resumo' }
  ]



  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const currentStep = steps[currentStepIndex]

  const nextStep = () => {
    if (currentStepIndex < steps.length - 1) setCurrentStepIndex(currentStepIndex + 1)
  }
  const prevStep = () => {
    if (currentStepIndex > 0) setCurrentStepIndex(currentStepIndex - 1)
  }

  const exigeNV = produtoSelecionado?.composicoes?.some(c => c.tipo === 'NV')
  const exigePT = produtoSelecionado?.composicoes?.some(c => c.tipo === 'PT')

  const temNV = adicionarSelecionado.some(a => a.tipo === 'NV')
  const temPT = adicionarSelecionado.some(a => a.tipo === 'PT')

  const podeConfirmar = (!exigeNV || temNV) && (!exigePT || temPT)

  useEffect(() => {
    if (modalAberto) {
      setCurrentImageIndex(0);
      setCurrentStepIndex(0);
    }
  }, [modalAberto, produtoSelecionado]);

  const currentImageUrl =
    produtoSelecionado?.imagens[currentImageIndex]?.imagem_url ||
    'https://placehold.co/800x600/CCCCCC/FFFFFF?text=No+Image'

  return (
    <Modal
      open={modalAberto}
      onCancel={() => setModalAberto(false)}
      footer={null}
      width={600}
      className="rounded-2xl overflow-hidden top-1 md:top-16"
      styles={{ content: { padding: 0, borderRadius: '16px', overflow: 'hidden' } }}
    >
      {produtoSelecionado && (
        <div className="bg-white flex flex-col md:flex-row h-full max-h-[85vh]">
          {/* Imagem + descrição */}
          <div className={`relative w-full md:w-1/2 md:h-auto overflow-hidden `}>
            <Image
              src={currentImageUrl}
              alt={produtoSelecionado.nome}
              width={400}
              height={400}
              className="object-cover "
            />
            <div className='p-2 md:p-4'>
              <h2 className="text-4xl font-extrabold text-gray-900 capitalize">{produtoSelecionado.nome}</h2>
              <p className="text-3xl font-extrabold text-d_primary mb-4">
                R${' '}
                {parseFloat(produtoSelecionado.preco).toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
            <DescricaoStyles value={produtoSelecionado.descricao} className="p-4 md:p-6" lines={3} />
          </div>

          {/* Conteúdo */}
          {steps.length > 0 && (
            <div className="flex-1 flex flex-col p-4 md:px-6 overflow-y-auto">
              <Adicionais
                composicoes={produtoSelecionado.composicoes || []}
                adicionarSelecionado={adicionarSelecionado}
                setAdicionarSelecionado={setAdicionarSelecionado}
              />

              <div className="mt-4">
                {currentStep.tipo === 'NV' && (
                  <NivelSelector
                    composicoes={produtoSelecionado.composicoes || []}
                    adicionarSelecionado={adicionarSelecionado}
                    setAdicionarSelecionado={(items) => {
                      setAdicionarSelecionado(items)
                      nextStep()
                    }}
                  />
                )}

                {currentStep.tipo === 'PT' && (
                  <PontoSelector
                    composicoes={produtoSelecionado.composicoes || []}
                    adicionarSelecionado={adicionarSelecionado}
                    setAdicionarSelecionado={(items) => {
                      setAdicionarSelecionado(items)
                      nextStep()
                    }}
                  />
                )}

                {currentStep.tipo === 'OP' && (
                  <OpcionaisSelector
                    composicoes={produtoSelecionado.composicoes || []}
                    opcionaisSelecionados={opcionaisSelecionados}
                    setOpcionaisSelecionados={setOpcionaisSelecionados}
                  />
                )}

                {currentStep.tipo === 'RM' && (
                  <div className="flex flex-col gap-4">
                    <RemoverComposicao
                      composicoes={produtoSelecionado.composicoes || []}
                      removerSelecionado={removerSelecionado}
                      setRemoverSelecionado={setRemoverSelecionado}
                    />
                    <Button
                      onClick={nextStep}
                      className="self-end bg-d_primary text-white font-bold py-2 px-4 rounded"
                    >
                      Ver Resumo
                    </Button>
                  </div>
                )}

                {currentStep.tipo === 'RES' && (
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2">Resumo do Pedido</h3>

                    {adicionarSelecionado.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-semibold">Adicionados:</h4>
                        <ul className="list-disc list-inside">
                          {adicionarSelecionado.map(a => (
                            <li key={a.id}>
                              {a.nome} {a.quantidade ? `${a.quantidade === 1 ? '' : `${a.quantidade}x `}` : ''} {a.preco_extra ? `(R$${a.preco_extra})` : ''}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {removerSelecionado.length > 0 && (
                      <div>
                        <h4 className="font-semibold">Removidos:</h4>
                        <ul className="list-disc list-inside">
                          {removerSelecionado.map(r => (
                            <li key={r.id || r}>
                              {r.nome || r}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  </div>
                )}
              </div>

            </div>
          )}

        </div>
      )}

      {/* Stepper fixo no rodapé */}
      <div className="sticky bottom-0 bg-white border-t">
        <div className="flex items-center justify-between p-4">
          {steps.map((s, index) => {
            const isActive = index === currentStepIndex
            const isCompleted = index < currentStepIndex

            return (
              <div key={s.tipo} className="flex items-center flex-1">
                <button
                  className={`flex items-center gap-2 text-sm font-medium transition
                    ${isActive ? 'text-d_primary font-bold' : isCompleted ? 'text-green-600' : 'text-gray-400'}
                  `}
                  onClick={() => {
                    if (isCompleted) setCurrentStepIndex(index)
                  }}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <Circle className={`w-5 h-5 ${isActive ? 'text-d_primary' : 'text-gray-400'}`} />
                  )}
                  {s.nome}
                </button>

                {index < steps.length - 1 && (
                  <div className={`flex-1 h-[2px] mx-2 ${isCompleted ? 'bg-green-600' : 'bg-gray-300'}`} />
                )}
              </div>
            )
          })}
        </div>

        {/* Botão de confirmação */}
        <div className="border-t p-4">
          <Button
            onClick={() => {
              if (podeConfirmar && produtoSelecionado) {
                confirmarAdicao({
                  id: produtoSelecionado.id,
                  nome: produtoSelecionado.nome,
                  valor: parseFloat(produtoSelecionado.preco),
                  desconto: 0,
                  quantidade: 1,
                  adicionar: adicionarSelecionado.map(a => ({
                    id: a.id,
                    quantidade: a.quantidade,
                    preco_extra: a.preco_extra || 0,
                  })),
                  remover: removerSelecionado.map(r => r.id),
                })
                setModalAberto(false)
              }
            }}
            disabled={!podeConfirmar}
            className={`w-full py-4 rounded-full font-bold text-lg transition
              ${podeConfirmar
                ? 'bg-d_primary text-white hover:bg-d_primary/90 active:scale-95'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          >
            Adicionar ao Pedido
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default React.memo(ProductModal)
