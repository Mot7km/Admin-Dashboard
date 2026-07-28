import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import Loader from './components/common/Loader'

const LoginPage = lazy(() => import('./pages/LoginPage'))
const HomePage = lazy(() => import('./pages/HomePage'))
const MenuPage = lazy(() => import('./pages/MenuPage'))
const ReviewsPage = lazy(() => import('./pages/ReviewsPage'))
const QrControlPage = lazy(() => import('./pages/QrControlPage'))
const BranchesPage = lazy(() => import('./pages/BranchesPage'))
const OrdersPage = lazy(() => import('./pages/OrdersPage'))
const EmployeesPage = lazy(() => import('./pages/EmployeesPage'))
const InventoryPage = lazy(() => import('./pages/InventoryPage'))
const SettingsPage = lazy(() => import('./pages/SettingsPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

export const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <Suspense fallback={<Loader />}>
        <LoginPage />
      </Suspense>
    ),
  },
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
        path: 'menu',
        element: (
          <Suspense fallback={<Loader />}>
            <MenuPage />
          </Suspense>
        ),
      },
      {
        path: 'reviews',
        element: (
          <Suspense fallback={<Loader />}>
            <ReviewsPage />
          </Suspense>
        ),
      },
      {
        path: 'qr-control',
        element: (
          <Suspense fallback={<Loader />}>
            <QrControlPage />
          </Suspense>
        ),
      },
      {
        path: 'branches',
        element: (
          <Suspense fallback={<Loader />}>
            <BranchesPage />
          </Suspense>
        ),
      },
      {
        path: 'orders',
        element: (
          <Suspense fallback={<Loader />}>
            <OrdersPage />
          </Suspense>
        ),
      },
      {
        path: 'employees',
        element: (
          <Suspense fallback={<Loader />}>
            <EmployeesPage />
          </Suspense>
        ),
      },
      {
        path: 'inventory',
        element: (
          <Suspense fallback={<Loader />}>
            <InventoryPage />
          </Suspense>
        ),
      },
      {
        path: 'settings',
        element: (
          <Suspense fallback={<Loader />}>
            <SettingsPage />
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
