import { HttpResponse, http } from 'msw'
import { env } from '@/env'

export const createMaterialMock = http.post(`${env.VITE_API_URL}/raw-materials`, () => {
  return new HttpResponse(null, { status: 201 })
})
