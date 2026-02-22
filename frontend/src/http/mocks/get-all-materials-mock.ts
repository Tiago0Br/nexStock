import { HttpResponse, http } from 'msw'
import type { RawMaterial } from '@/types'
import { getFullUrl } from '@/utils/get-full-url'

export const getAllMaterialsMock = http.get<never, never, RawMaterial[]>(
  getFullUrl('/raw-materials'),
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
