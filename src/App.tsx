import { useState } from 'react'

import AppRouters from 'router'
import AppContext from 'context'

const { Provider } = AppContext

const App: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(
    localStorage.getItem('isLogin') === 'true'
  )

  return (
    <Provider
      value={{
        isLogin,
        setIsLogin: (state: boolean) => {
          setIsLogin(state)
        }
      }}
    >
      <AppRouters />
    </Provider>
  )
}

export default App
