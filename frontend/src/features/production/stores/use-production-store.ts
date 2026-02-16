import { create } from 'zustand'
import { api } from '@/services/api'
import type { ProductionPlan } from '@/types'

interface ProductionStore {
  plan: ProductionPlan | null
  isLoading: boolean
  fetchPlan: () => Promise<void>
}

export const useProductionStore = create<ProductionStore>((set) => ({
  plan: null,
  isLoading: false,

  fetchPlan: async () => {
    set({ isLoading: true })
    try {
      const response = await api.get('/products/production-plan')
      set({ plan: response.data, isLoading: false })
    } catch (error) {
      console.error('Erro ao buscar plano de produção:', error)
      set({ isLoading: false })
    }
  }
}))
