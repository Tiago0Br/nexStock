import { HttpResponse, http } from 'msw'
import { getFullUrl } from '@/utils/get-full-url'

export const updateProductMock = http.put(getFullUrl('/products/:productId'), () => {
  return new HttpResponse(null, { status: 200 })
})
