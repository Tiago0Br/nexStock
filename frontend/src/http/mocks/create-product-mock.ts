import { HttpResponse, http } from 'msw'
import { getFullUrl } from '@/utils/get-full-url'

export const createProductMock = http.post(getFullUrl('/products'), () => {
  return new HttpResponse(null, { status: 201 })
})
