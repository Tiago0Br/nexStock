import { api } from '@/services/api'
import type { SaveRawMaterial } from '@/types'

interface CreateMaterialRequestBody {
  material: SaveRawMaterial
}

export function createMaterialRequest({ material }: CreateMaterialRequestBody) {
  return api.post('/raw-materials', material)
}
