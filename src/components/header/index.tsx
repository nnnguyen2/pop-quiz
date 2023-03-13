import { Layout, Menu, Button, Avatar } from 'antd'
import { useNavigate } from 'react-router-dom'

import styles from './style.module.scss'

const { Header } = Layout

const AppHeader: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Header className={styles.header}>
      <span className={styles.logo} />

      <Menu
        className={styles.menu}
        defaultSelectedKeys={['1']}
        items={new Array(1).fill(null).map((_, index) => ({
          key: String(index + 1),
          label: 'Dashboard'
        }))}
        mode='horizontal'
        theme='dark'
      />

      <div className={styles.user}>
        <Avatar src='https://joesch.moe/api/v1/random?key=1' />
        <Button
          type='link'
          onClick={() => {
            navigate('/login')
          }}
        >
          Logout
        </Button>
      </div>
    </Header>
  )
}

export default AppHeader
