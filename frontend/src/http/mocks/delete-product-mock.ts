import { HttpResponse, http } from 'msw'
import { getFullUrl } from '@/utils/get-full-url'

export const deleteProductMock = http.delete(getFullUrl('/products/:productId'), () => {
  return new HttpResponse(null, { status: 204 })
})
