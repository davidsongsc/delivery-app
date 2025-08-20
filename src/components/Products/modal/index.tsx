import React, { useEffect, useState } from 'react';
import { Modal, Checkbox } from 'antd';

interface IProduto {
  id: string;
  imagens: { id: string; imagem_url: string; descricao: string | null; ordem: number }[];
  categoria: { id: string; nome: string; parent: string | null; ativo: boolean; tipo: string; subcategorias: any[]; tenant: string };
  nome: string;
  descricao: string;
  preco: string;
  adicionar?: (string | { item: string; valor: number })[];
  composicao?: string[];
}

interface ProductModalProps {
  modalAberto: boolean;
  setModalAberto: (open: boolean) => void;
  produtoSelecionado: IProduto | null;
  confirmarAdicao: () => void;
  adicionarSelecionado: string[];
  setAdicionarSelecionado: (items: string[]) => void;
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (modalAberto) setCurrentImageIndex(0);
  }, [modalAberto, produtoSelecionado]);

  const nextImage = () => {
    if (produtoSelecionado && produtoSelecionado.imagens.length > 1) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % produtoSelecionado.imagens.length);
    }
  };

  const prevImage = () => {
    if (produtoSelecionado && produtoSelecionado.imagens.length > 1) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + produtoSelecionado.imagens.length) % produtoSelecionado.imagens.length);
    }
  };

  const currentImageUrl =
    produtoSelecionado?.imagens[currentImageIndex]?.imagem_url ||
    'https://placehold.co/800x600/CCCCCC/FFFFFF?text=No+Image';

  return (
    <Modal
      open={modalAberto}
      onCancel={() => setModalAberto(false)}
      footer={null}
      width={700}
      className="rounded-2xl overflow-hidden"
      styles={{ content: { padding: 0, borderRadius: '16px', overflow: 'hidden' } }}
    >
      {produtoSelecionado && (
        <div className="bg-white flex flex-col">
          {/* Imagem */}
          <div className="relative h-72 w-full overflow-hidden">
            <img
              src={currentImageUrl}
              alt={produtoSelecionado.nome}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://placehold.co/800x600/CCCCCC/FFFFFF?text=Imagem+Nao+Disponivel';
                e.currentTarget.onerror = null;
              }}
            />
            {produtoSelecionado.imagens.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full">
                  &#10094;
                </button>
                <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full">
                  &#10095;
                </button>
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                  {produtoSelecionado.imagens.map((_, index) => (
                    <span
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full cursor-pointer ${index === currentImageIndex ? 'bg-white' : 'bg-gray-400'}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Info */}
          <div className="p-6 flex flex-col gap-4">
            <h2 className="text-2xl font-extrabold text-gray-900">{produtoSelecionado.nome}</h2>
            <p className="text-gray-600 text-base">{produtoSelecionado.descricao || 'Nenhuma descrição disponível.'}</p>
            <p className="text-3xl font-extrabold text-d_primary">
              R$ {parseFloat(produtoSelecionado.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>

            {/* Adicionais */}
            {produtoSelecionado.adicionar && produtoSelecionado.adicionar.length > 0 && (
              <div className="p-4 bg-gray-50 rounded-lg border">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Adicionais</h3>
                <Checkbox.Group
                  className="grid grid-cols-1 md:grid-cols-2 gap-3"
                  value={adicionarSelecionado}
                  onChange={(val) => setAdicionarSelecionado(val as string[])}
                >
                  {produtoSelecionado.adicionar.map((a, i) => {
                    const label = typeof a === 'string' ? a : `${a.item} (+R$ ${a.valor.toFixed(2)})`;
                    const value = typeof a === 'string' ? a : a.item;
                    return (
                      <Checkbox key={i} value={value} className="text-gray-700">
                        {label}
                      </Checkbox>
                    );
                  })}
                </Checkbox.Group>
              </div>
            )}

            {/* Remover da composição */}
            {produtoSelecionado.composicao && produtoSelecionado.composicao.length > 0 && (
              <div className="p-4 bg-gray-50 rounded-lg border">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Remover da composição</h3>
                <Checkbox.Group
                  className="grid grid-cols-1 md:grid-cols-2 gap-3"
                  value={removerSelecionado}
                  onChange={(val) => setRemoverSelecionado(val as string[])}
                >
                  {produtoSelecionado.composicao.map((comp, i) => (
                    <Checkbox key={i} value={comp} className="text-gray-700">
                      {comp}
                    </Checkbox>
                  ))}
                </Checkbox.Group>
              </div>
            )}

            {/* CTA */}
            <button
              onClick={confirmarAdicao}
              className="w-full bg-d_primary text-white py-4 rounded-full font-bold text-lg mt-4 hover:bg-d_primary/90 active:scale-95 transition"
            >
              Adicionar ao Pedido
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default React.memo(ProductModal);
