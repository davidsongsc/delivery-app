import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IItem } from '@/interfaces/IPedido';

interface DeliveryState {
  itensPedido: IItem[];
  taxaEntrega: number;

  adicionarItem: (item: IItem) => void;
  alterarQuantidade: (index: number, operacao: 'incrementar' | 'decrementar') => void;
  removerItem: (index: number) => void;
  limparPedido: () => void;
  setTaxaEntrega: (valor: number) => void;
}

export const useDeliveryStore = create<DeliveryState>()(
  persist(
    (set, get) => ({
      itensPedido: [],
      taxaEntrega: 0,

      adicionarItem: (item: IItem) => {
        const itens = [...get().itensPedido];
        const existenteIndex = itens.findIndex(i =>
          i.id === item.id &&
          JSON.stringify(i.adicionar) === JSON.stringify(item.adicionar) &&
          JSON.stringify(i.remover) === JSON.stringify(item.remover)
        );

        if (existenteIndex !== -1) {
          itens[existenteIndex].quantidade += item.quantidade;
        } else {
          itens.push(item);
        }

        set({ itensPedido: itens });
      },

      alterarQuantidade: (index, operacao) => {
        const itens = [...get().itensPedido];
        if (operacao === 'incrementar') {
          itens[index].quantidade += 1;
        } else if (operacao === 'decrementar') {
          itens[index].quantidade -= 1;
          if (itens[index].quantidade <= 0) {
            itens.splice(index, 1);
          }
        }
        set({ itensPedido: itens });
      },

      removerItem: (index) => {
        const itens = [...get().itensPedido];
        itens.splice(index, 1);
        set({ itensPedido: itens });
      },

      limparPedido: () => set({ itensPedido: [], taxaEntrega: 0 }),

      setTaxaEntrega: (valor: number) => set({ taxaEntrega: valor }),
    }),
    {
      name: 'delivery-pedido-store',
    }
  )
);
