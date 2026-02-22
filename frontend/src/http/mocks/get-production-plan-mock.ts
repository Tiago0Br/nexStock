import { HttpResponse, http } from 'msw'
import { env } from '@/env'
import type { ProductionPlan } from '@/types'

export const getProductionPlanMock = http.get<never, never, ProductionPlan>(
  `${env.VITE_API_URL}/products/production-plan`,
  async () => {
    return HttpResponse.json({
      productionList: [
        {
          productName: 'Bolo de chocolate',
          quantityToProduce: 2,
          unitPrice: 25.9,
          subTotal: 51.8
        },
        {
          productName: 'Ovo de chocolate',
          quantityToProduce: 5,
          unitPrice: 9.99,
          subTotal: 49.95
        }
      ],
      totalItems: 7,
      totalValue: 101.75
    })
  }
)
