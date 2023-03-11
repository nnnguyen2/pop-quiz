import { type ReactElement } from 'react'
import { Navigate } from 'react-router'

import { LoginPage, ClientDashboardPage, RegisterPage } from 'page'

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
  }
]

export const clientRouters: Route[] = [
  {
    key: 'client-dashboard',
    path: '/client/dashboard',
    element: <ClientDashboardPage />
  }
]
