import { HttpResponse, http } from 'msw'
import { getFullUrl } from '@/utils/get-full-url'

export const createMaterialMock = http.post(getFullUrl('/raw-materials'), () => {
  return new HttpResponse(null, { status: 201 })
})
