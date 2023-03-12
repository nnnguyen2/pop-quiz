import { Button, Form, Input, Typography, notification } from 'antd'
import { find } from 'lodash'
import { useNavigate } from 'react-router-dom'

import styles from 'module_styles/_page.module.scss'
import { accounts, type Account } from 'mock'

const { Title } = Typography
const { Item: FormItem } = Form

const Login: React.FC = () => {
  const navigate = useNavigate()

  const onLogin: (values: Account) => void = ({ username, password }) => {
    const account: Account | undefined = find(accounts, { username })
    if (account === undefined) {
      notification.error({ message: 'User is not existed!' })
      return
    }
    if (account.password !== password) {
      notification.error({ message: 'Wrong password!' })
      return
    }
    console.log(account)
    if (account.isAdmin ?? false) {
      navigate('/admin/dashboard')
      return
    }
    navigate('/client/dashboard')
  }

  return (
    <div className={styles.page}>
      <Form
        autoComplete='off'
        className={styles.form}
        layout='vertical'
        onFinish={onLogin}
      >
        <Title>Login</Title>

        <FormItem
          label='Username'
          name='username'
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </FormItem>

        <FormItem
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </FormItem>

        <FormItem>
          <Button htmlType='submit' type='primary' block>
            Submit
          </Button>
          <div className={styles.action}>
            <Button
              type='link'
              onClick={() => {
                navigate('/register')
              }}
            >
              Register
            </Button>
            <Button
              type='link'
              onClick={() => {
                navigate('/forgot')
              }}
            >
              Forgot Password
            </Button>
          </div>
        </FormItem>
      </Form>
    </div>
  )
}

export default Login
