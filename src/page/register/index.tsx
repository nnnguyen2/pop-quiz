import { Button, Form, Input, Typography, notification } from 'antd'
import { find } from 'lodash'
import { useNavigate } from 'react-router-dom'

import styles from 'module_styles/_page.module.scss'
import { accounts } from 'mock'
import { type RegisterAccount, type Account } from 'interface'

const { Title } = Typography
const { Item: FormItem } = Form

const Register: React.FC = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const onRegister: (values: RegisterAccount) => void = ({ username }) => {
    const account: Account | undefined = find(accounts, { username })
    if (account !== undefined) {
      notification.error({ message: 'User is existed!' })
      return
    }
    notification.success({ message: 'Create account success!' })
    navigate('/login')
  }

  return (
    <div className={styles.page}>
      <Form
        autoComplete='off'
        className={styles.form}
        form={form}
        layout='vertical'
        scrollToFirstError
        onFinish={onRegister}
      >
        <Title>Register</Title>

        <FormItem
          label='Username'
          name='username'
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </FormItem>

        <FormItem
          label='Email'
          name='email'
          rules={[
            { required: true, message: 'Please input your email!' },
            {
              type: 'email',
              message: 'The input is not valid E-mail!'
            }
          ]}
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

        <FormItem
          label='Confirm Password'
          name='confirm_password'
          rules={[
            { required: true, message: 'Please input your confirm password!' },
            ({ getFieldValue }) => ({
              validator: async (_, value) => {
                if (
                  value === undefined ||
                  getFieldValue('password') === value
                ) {
                  await Promise.resolve()
                  return
                }
                return await Promise.reject(
                  new Error(
                    'The confirm password that you entered do not match!'
                  )
                )
              }
            })
          ]}
        >
          <Input.Password />
        </FormItem>

        <FormItem>
          <Button htmlType='submit' type='primary' block>
            Register
          </Button>
          <Button
            type='link'
            block
            onClick={() => {
              navigate(-1)
            }}
          >
            Cancel
          </Button>
        </FormItem>
      </Form>
    </div>
  )
}

export default Register
