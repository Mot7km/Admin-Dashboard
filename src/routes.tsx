import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import Loader from './components/common/Loader'

const HomePage = lazy(() => import('./pages/HomePage'))
const MockPage = lazy(() => import('./pages/MockPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loader />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: 'mock',
        element: (
          <Suspense fallback={<Loader />}>
            <MockPage />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<Loader />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
])
