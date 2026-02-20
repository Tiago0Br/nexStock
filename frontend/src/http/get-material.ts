import { api } from '@/services/api'
import type { RawMaterial } from '@/types'

export async function getMaterialsRequest() {
  const response = await api.get<RawMaterial[]>('/raw-materials')

  return response.data
}
