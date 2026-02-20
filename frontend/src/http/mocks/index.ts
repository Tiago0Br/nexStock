import { setupWorker } from 'msw/browser'
import { env } from '@/env'

export const worker = setupWorker()

export async function enableMsw() {
  if (env.MODE !== 'test') {
    return
  }

  await worker.start()
}
