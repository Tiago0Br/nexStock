import axios, { isAxiosError } from 'axios'
import { env } from '@/env'
import { type ApiErrorResponse, ApiErrorType } from '@/types'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export function getErrorMessageByError(error: unknown): string {
  if (isAxiosError(error)) {
    const errorResponse = error.response?.data as ApiErrorResponse

    switch (errorResponse?.type) {
      case ApiErrorType.CONFLICT:
        return 'Não é possível excluir o item pois ele possui vínculo!'
      case ApiErrorType.NOT_FOUND:
        return 'Recurso não encontrado!'
      case ApiErrorType.VALIDATION:
        return 'Verifique os campos e tente novamente!'
      default:
        break
    }
  }

  return 'Erro desconhecido. Tente novamente mais tarde!'
}
