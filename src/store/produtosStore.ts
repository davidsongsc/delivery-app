// store/produtosStore.ts
import { create } from 'zustand';
import { IProduto } from '@/interfaces/IProduto';

interface ProdutosState {
  produtos: IProduto[];
  setProdutos: (produtos: IProduto[]) => void;
  categorias: string[];
  atualizarCategorias: () => void;
}

export const useProdutosStore = create<ProdutosState>((set, get) => ({
  produtos: [],
  setProdutos: (produtos) => {
    set({ produtos });
    get().atualizarCategorias(); // Atualiza categorias automaticamente
  },
  categorias: [],
  atualizarCategorias: () => {
    const produtos = get().produtos;
    const unicas = [...new Set(produtos.map(p => p.categoria || 'Outros'))];
    set({ categorias: ['Todos', ...unicas] });
  },
}));
