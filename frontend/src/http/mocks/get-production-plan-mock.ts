import { HttpResponse, http } from 'msw'
import type { ProductionPlan } from '@/types'
import { getFullUrl } from '@/utils/get-full-url'

export const getProductionPlanMock = http.get<never, never, ProductionPlan>(
  getFullUrl('/products/production-plan'),
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
