import { api } from '@/services/api'
import type { ProductionPlan } from '@/types'

export async function getProductionPlanRequest() {
  const response = await api.get<ProductionPlan>('/products/production-plan')

  return response.data
}
