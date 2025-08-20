import { create } from 'zustand';

interface GlobalLoadingState {
  isLoading: boolean;
  loaders: string[];
  startLoading: (id: string) => void;
  stopLoading: (id: string) => void;
  stopGlobalTimeout: () => void;
}

export const useGlobalLoadingStore = create<GlobalLoadingState>((set) => ({
  isLoading: false,
  loaders: [],
  startLoading: (id) =>
    set((state) => {
      if (state.loaders.includes(id)) return state;
      const loaders = [...state.loaders, id];
      return { loaders, isLoading: loaders.length > 0 };
    }),
  stopLoading: (id) =>
    set((state) => {
      const loaders = state.loaders.filter((loader) => loader !== id);
      return { loaders, isLoading: loaders.length > 0 };
    }),
  stopGlobalTimeout: () =>
    set((state) => {
      const loaders = state.loaders.filter((loader) => loader !== 'global_timeout');
      return { loaders, isLoading: loaders.length > 0 };
    }),
}));
