import { HttpResponse, http } from 'msw'
import { env } from '@/env'
import type { RawMaterial } from '@/types'

export const getMaterialMock = http.get<never, never, RawMaterial[]>(
  `${env.VITE_API_URL}/raw-materials`,
  async () => {
    return HttpResponse.json([
      {
        id: 1,
        name: 'Farinha de trigo',
        stockQuantity: 100,
        unit: 'KG'
      }
    ])
  }
)
