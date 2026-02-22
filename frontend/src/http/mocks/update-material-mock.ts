import { HttpResponse, http } from 'msw'
import { getFullUrl } from '@/utils/get-full-url'

export const updateMaterialMock = http.put(
  getFullUrl('/raw-materials/:materialId'),
  () => {
    return new HttpResponse(null, { status: 200 })
  }
)
