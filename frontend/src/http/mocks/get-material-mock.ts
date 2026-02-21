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
        stockQuantity: 300,
        unit: 'G'
      },
      {
        id: 2,
        name: 'Ovo',
        stockQuantity: 30,
        unit: 'UN'
      },
      {
        id: 3,
        name: 'Barra de chocolate',
        stockQuantity: 10,
        unit: 'UN'
      }
    ])
  }
)
