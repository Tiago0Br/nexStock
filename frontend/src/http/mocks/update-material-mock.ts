import { HttpResponse, http } from 'msw'
import { env } from '@/env'

export const updateMaterialMock = http.put(
  `${env.VITE_API_URL}/raw-materials/:materialId`,
  () => {
    return new HttpResponse(null, { status: 200 })
  }
)
