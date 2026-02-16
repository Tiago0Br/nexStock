import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { MainLayout } from './components/layout/main-layout'
import { Toaster } from './components/ui/sonner'
import { MaterialsPage } from './features/materials'
import { DashboardPage } from './features/production'
import { ProductsPage } from './features/products'
import { NotFoundPage } from './pages/not-found'

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
        },
        {
          path: '*',
          element: <NotFoundPage />
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
