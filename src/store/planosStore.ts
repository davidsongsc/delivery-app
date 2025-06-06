import { create } from 'zustand';
import { Plano, getPlanosCompletos } from '@/services/planos.service';

type PlanStore = {
  planos: Plano[];
  featuresGlobais: string[];
  loading: boolean;
  error: string | null;
  fetchPlanos: () => Promise<void>;
};
export const usePlanStore = create<PlanStore>((set) => ({
  planos: [],
  featuresGlobais: [],
  loading: false,
  error: null,
  fetchPlanos: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getPlanosCompletos();
      set({ planos: data.plans, featuresGlobais: data.features });
    } catch (error) {
      set({ error: 'Erro ao buscar planos' });
    } finally {
      set({ loading: false });
    }
  },
}));
