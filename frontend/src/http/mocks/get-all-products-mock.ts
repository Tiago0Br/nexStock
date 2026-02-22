import { HttpResponse, http } from 'msw'
import type { Product } from '@/types'
import { getFullUrl } from '@/utils/get-full-url'

export const getAllProductsMock = http.get<never, never, Product[]>(
  getFullUrl('/products'),
  async () => {
    return HttpResponse.json([
      {
        id: 1,
        name: 'Bolo de chocolate',
        price: 25.9,
        composition: [
          {
            id: 1,
            rawMaterial: {
              id: 1,
              name: 'Farinha de trigo',
              stockQuantity: 300,
              unit: 'G'
            },
            quantityRequired: 50
          },
          {
            id: 2,
            rawMaterial: {
              id: 2,
              name: 'Ovo',
              stockQuantity: 30,
              unit: 'UN'
            },
            quantityRequired: 3
          },
          {
            id: 3,
            rawMaterial: {
              id: 3,
              name: 'Barra de chocolate',
              stockQuantity: 50,
              unit: 'UN'
            },
            quantityRequired: 4
          }
        ]
      },
      {
        id: 2,
        name: 'Ovo de chocolate',
        price: 9.99,
        composition: [
          {
            id: 4,
            rawMaterial: {
              id: 2,
              name: 'Ovo',
              stockQuantity: 30,
              unit: 'UN'
            },
            quantityRequired: 1
          },
          {
            id: 5,
            rawMaterial: {
              id: 3,
              name: 'Barra de chocolate',
              stockQuantity: 50,
              unit: 'UN'
            },
            quantityRequired: 1
          }
        ]
      }
    ])
  }
)
