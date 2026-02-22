import { defineConfig } from 'cypress'

export default defineConfig({
  allowCypressEnv: false,
  e2e: {
    baseUrl: 'http://localhost:3001',
    video: true,
    viewportWidth: 1768,
    viewportHeight: 1366
  }
})
