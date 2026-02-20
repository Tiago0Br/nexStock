import { z } from 'zod'

const envSchema = z.object({
  MODE: z.enum(['development', 'test', 'production']).default('development'),
  VITE_API_URL: z.string()
})

const result = envSchema.safeParse(import.meta.env)

if (!result.success) {
  console.error('Invalid environment variables: ', result.error.message)
  throw new Error('Invalid environment variables!')
}

export const env = result.data
