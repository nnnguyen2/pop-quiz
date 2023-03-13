import { type ReactNode, useContext, useEffect } from 'react'
import { Layout } from 'antd'
import csx from 'classnames'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

import Header from '../header'
import styles from './style.module.scss'
import { AppContext } from 'context'

const { Content } = Layout

const AppLayout: React.FC<{ children?: ReactNode }> = ({ children }) => {
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

  return (
    <Layout>
      <Header />
      <Content className={csx('site-layout', styles.content)}>
        <div>{children}</div>
      </Content>
    </Layout>
  )
}

AppLayout.propTypes = {
  children: PropTypes.node
}

export default AppLayout
