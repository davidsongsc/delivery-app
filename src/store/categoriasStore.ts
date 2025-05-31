import { create } from 'zustand';

interface CategoriasState {
  categorias: string[];
  setCategorias: (categorias: string[]) => void;
}

export const useCategoriasStore = create<CategoriasState>((set) => ({
  categorias: [],
  setCategorias: (categorias) => set({ categorias }),
}));
