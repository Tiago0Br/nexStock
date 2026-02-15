import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { MainLayout } from './components/layout/main-layout'
import { DashboardPage } from './pages/dashboard'
import { ProductsPage } from './pages/products'
import { MaterialsPage } from './features/materials'
import { Toaster } from './components/ui/sonner'

export function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          path: '/',
          element: <DashboardPage />
        },
        {
          path: '/products',
          element: <ProductsPage />
        },
        {
          path: '/materials',
          element: <MaterialsPage />
        }
      ]
    }
  ])

  return (
    <>
      <Toaster richColors closeButton position="top-center" />
      <RouterProvider router={router} />
    </>
  )
}
