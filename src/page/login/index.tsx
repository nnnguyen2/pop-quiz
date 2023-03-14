import { useState, useContext } from 'react'
import {
  Alert,
  Button,
  Form,
  Input,
  Typography,
  notification,
  message
} from 'antd'
import { find } from 'lodash'
import { useNavigate } from 'react-router-dom'

import { OtpConfirm } from 'components'
import { AppContext } from 'context'
import { emptyAccount, LOGIN_STEP } from 'enums'
import { type Account } from 'interface'
import styles from 'module_styles/_page.module.scss'
import { accounts } from 'mock'

const { Title } = Typography
const { Item: FormItem } = Form

const Login: React.FC = () => {
  const { setIsLogin } = useContext(AppContext)
  const navigate = useNavigate()

  const [step, setStep] = useState<LOGIN_STEP>(LOGIN_STEP.FORM)
  const [account, setAccount] = useState<Account>(emptyAccount)
  const [failedLogin, setFailedLogin] = useState<number>(0)

  const onLogin = async ({
    username,
    password
  }: {
    username: string
    password: string
  }): Promise<any> => {
    const account: Account | undefined = find(accounts, { username })
    if (account === undefined) {
      notification.error({ message: 'User is not existed!' })
      return
    }
    if (account.password !== password) {
      if (failedLogin === 2) {
        await message.open({
          type: 'error',
          content: 'Your account is blocked!'
        })
        return
      }

      setFailedLogin((prev) => prev + 1)
      notification.error({ message: 'Wrong password!' })
      return
    }
    setAccount(account)
    setStep(LOGIN_STEP.OTP)
  }

  const onConfirmOtp: () => void = () => {
    setIsLogin(true)
    const { isAdmin } = account
    if (isAdmin as boolean) {
      localStorage.setItem('isLogin', 'true')
      navigate('/admin/dashboard')
      return
    }
    navigate('/client/dashboard')
  }

  return (
    <div className={styles.page}>
      <div className={styles.form}>
        {step === 1 && (
          <>
            <Form autoComplete='off' layout='vertical' onFinish={onLogin}>
              <Title>Login</Title>

              <FormItem
                label='Username'
                name='username'
                rules={[
                  { required: true, message: 'Please input your username!' }
                ]}
              >
                <Input />
              </FormItem>

              <FormItem
                label='Password'
                name='password'
                rules={[
                  { required: true, message: 'Please input your password!' }
                ]}
              >
                <Input.Password />
              </FormItem>

              <FormItem>
                <Button
                  disabled={failedLogin > 2}
                  htmlType='submit'
                  type='primary'
                  block
                >
                  Login
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
            <Alert
              message={
                <>
                  Use account bellow for example login:
                  <div>
                    Username: <b>client</b> / <b>admin</b>
                  </div>
                  <div>
                    Password: <b>123456</b>
                  </div>
                </>
              }
              type='info'
            />
          </>
        )}

        {step === 2 && (
          <OtpConfirm
            okText='Login'
            onCancel={() => {
              setStep(LOGIN_STEP.FORM)
            }}
            onFinish={onConfirmOtp}
          />
        )}
      </div>
    </div>
  )
}

export default Login
