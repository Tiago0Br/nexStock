import { toast } from 'sonner'
import { create } from 'zustand'
import { getProductionPlanRequest } from '@/http/get-production-plan'
import { getErrorMessageByError } from '@/services/api'
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
      const plan = await getProductionPlanRequest()
      set({ plan, isLoading: false })
    } catch (error) {
      set({ isLoading: false })
      toast.error(getErrorMessageByError(error))
    }
  }
}))
