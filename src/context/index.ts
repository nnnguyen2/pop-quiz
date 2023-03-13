import { createContext } from 'react'

export interface AuthorizedContext {
  isLogin: boolean
  setIsLogin: any
}

export const AppContext = createContext<AuthorizedContext>({
  isLogin: false,
  setIsLogin: () => {}
})

export default AppContext
