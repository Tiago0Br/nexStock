import { HttpResponse, http } from 'msw'
import { getFullUrl } from '@/utils/get-full-url'

export const deleteMaterialMock = http.delete(
  getFullUrl('/raw-materials/:materialId'),
  () => {
    return new HttpResponse(null, { status: 204 })
  }
)
