import { Form, Input, Button, notification } from 'antd'
import { find } from 'lodash'

import { accounts } from 'mock'
import { type EmailAccount, type Account } from 'interface'

const { Item: FormItem } = Form

const EmailSubmit: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const onSendMailOtp: (values: EmailAccount) => void = ({ email }) => {
    const account: Account | undefined = find(accounts, { email })

    if (account === undefined) {
      notification.error({ message: 'Email is not existed!' })
      return
    }
    onFinish()
  }

  return (
    <Form
      autoComplete='off'
      layout='vertical'
      scrollToFirstError
      onFinish={onSendMailOtp}
    >
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

      <FormItem style={{ marginBottom: 0 }}>
        <Button htmlType='submit' type='primary' block>
          Next
        </Button>
      </FormItem>
    </Form>
  )
}

export default EmailSubmit
