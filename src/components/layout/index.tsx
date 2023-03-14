import { type ReactNode } from 'react'
import { Layout } from 'antd'
import csx from 'classnames'
import PropTypes from 'prop-types'

import Header from '../header'
import styles from './style.module.scss'

const { Content } = Layout

const AppLayout: React.FC<{ children?: ReactNode }> = ({ children }) => {
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
