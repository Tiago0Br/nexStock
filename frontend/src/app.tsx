import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider'
import { Toaster } from './components/ui/sonner'
import { router } from './router'

export function App() {
  return (
    <ThemeProvider>
      <Toaster richColors closeButton position="top-center" />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
