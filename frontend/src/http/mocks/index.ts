import { setupWorker } from 'msw/browser'
import { env } from '@/env'
import * as mocks from './mocks'

export const worker = setupWorker(...Object.values(mocks))

export async function enableMsw() {
  if (env.MODE !== 'test') {
    return
  }

  await worker.start()
}
