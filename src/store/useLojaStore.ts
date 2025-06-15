import { create } from 'zustand';
import { Loja } from '@/services/lojas.service';

type LojaStore = {
  loja: Loja | null;
  setLoja: (loja: Loja | null) => void;
};

export const useLojaStore = create<LojaStore>((set) => ({
  loja: null,
  setLoja: (loja) => set({ loja }),
}));
