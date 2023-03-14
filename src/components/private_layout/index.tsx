import { useContext, useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'

import { AppContext } from 'context'

const PrivateLayout: React.FC = () => {
  const { isLogin } = useContext(AppContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLogin) {
      navigate('/login')
    }
  }, [isLogin])

  if (!isLogin) {
    return null
  }

  return <Outlet />
}

export default PrivateLayout
