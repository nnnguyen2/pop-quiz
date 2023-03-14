import { createContext } from 'react'

export interface AuthorizedContext {
  isLogin: boolean
  setIsLogin: (isLogin: boolean) => void
}

export const AppContext = createContext<AuthorizedContext>({
  isLogin: false,
  setIsLogin: () => {}
})

export default AppContext
