import { api } from '@/services/api'

interface DeleteMaterialRequestParams {
  materialId: number
}

export function deleteMaterialRequest({ materialId }: DeleteMaterialRequestParams) {
  return api.delete(`/raw-materials/${materialId}`)
}
