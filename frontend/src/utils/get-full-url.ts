import { env } from '@/env'

export function getFullUrl(path: string) {
  return new URL(path, env.VITE_API_URL).href
}
