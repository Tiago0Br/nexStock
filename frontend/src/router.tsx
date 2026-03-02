import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from './components/layout/main-layout'
import { MaterialsPage } from './features/materials/pages'
import { DashboardPage } from './features/production/pages'
import { ProductsPage } from './features/products/pages'
import { ErrorPage } from './pages/error'
import { NotFoundPage } from './pages/not-found'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
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
