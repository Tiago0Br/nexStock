import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { MainLayout } from './components/main-layout'
import { DashboardPage } from './pages/dashboard'
import { ProductsPage } from './pages/products'
import { MaterialsPage } from './pages/materials'

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

  return <RouterProvider router={router} />
}
