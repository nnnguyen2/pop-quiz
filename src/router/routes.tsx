import { type ReactElement } from 'react'
import { Navigate } from 'react-router'

import {
  AdminDashboardPage,
  ClientDashboardPage,
  ForgotPage,
  LoginPage,
  RegisterPage
} from 'page'

export interface Route {
  key: string
  path: string
  element?: ReactElement | null
}

export const publicRouters: Route[] = [
  {
    key: 'home',
    path: '/',
    element: <Navigate to='/login' />
  },
  {
    key: 'login',
    path: '/login',
    element: <LoginPage />
  },
  {
    key: 'register',
    path: '/register',
    element: <RegisterPage />
  },
  {
    key: 'forgot',
    path: '/forgot',
    element: <ForgotPage />
  }
]

export const clientRouters: Route[] = [
  {
    key: 'client-dashboard',
    path: '/client/dashboard',
    element: <ClientDashboardPage />
  }
]

export const adminRouters: Route[] = [
  {
    key: 'admin-dashboard',
    path: '/admin/dashboard',
    element: <AdminDashboardPage />
  }
]
