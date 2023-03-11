import { Form, Input, Button, Typography, notification } from 'antd'
import { useNavigate } from 'react-router-dom'

const { Title } = Typography
const { Item: FormItem } = Form

const NewPassword: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Form
      autoComplete='off'
      layout='vertical'
      scrollToFirstError
      onFinish={() => {
        notification.success({ message: 'Change password success!' })
        navigate('/login')
      }}
    >
      <Title level={4}>Enter new password</Title>

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
              if (value === undefined || getFieldValue('password') === value) {
                await Promise.resolve()
                return
              }
              return await Promise.reject(
                new Error('The confirm password that you entered do not match!')
              )
            }
          })
        ]}
      >
        <Input.Password />
      </FormItem>

      <FormItem style={{ marginBottom: 0 }}>
        <Button htmlType='submit' type='primary' block>
          Save
        </Button>
      </FormItem>
    </Form>
  )
}

export default NewPassword
