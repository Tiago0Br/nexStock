import { api } from '@/services/api'
import type { SaveRawMaterial } from '@/types'

interface UpdateMaterialRequestBody {
  materialId: number
  material: SaveRawMaterial
}

export function updateMaterialRequest({
  materialId,
  material
}: UpdateMaterialRequestBody) {
  return api.put(`/raw-materials/${materialId}`, material)
}
