import { useState } from 'react'
import { Form, Button, notification } from 'antd'
import OtpInput from 'react-otp-input'
import PropTypes from 'prop-types'

import { OTP } from 'mock'

const { Item: FormItem } = Form

interface Props {
  onFinish: () => void
  onCancel: () => void
}

const EmailSubmit: React.FC<Props> = ({ onFinish, onCancel }) => {
  const [otp, setOtp] = useState('')
  const [error, setError] = useState(false)

  const onValidateOtp: () => void = () => {
    if (otp !== OTP) {
      setError(true)
      notification.error({ message: 'OTP is not valid!' })
      return
    }
    onFinish()
  }

  return (
    <Form autoComplete='off' layout='vertical'>
      <FormItem label='OTP has been sent to your email. Please enter the OTP to the field below.'>
        <OtpInput
          containerStyle={{
            justifyContent: 'space-between'
          }}
          errorStyle={{ borderColor: 'red' }}
          hasErrored={error}
          inputStyle={{
            padding: '1rem'
          }}
          numInputs={6}
          value={otp}
          onChange={setOtp}
        />
      </FormItem>

      <FormItem style={{ marginBottom: 0 }}>
        <Button type='primary' block onClick={onValidateOtp}>
          Login
        </Button>
        <Button type='link' block onClick={onCancel}>
          Cancel
        </Button>
      </FormItem>
    </Form>
  )
}

EmailSubmit.propTypes = {
  onFinish: PropTypes.any,
  onCancel: PropTypes.any
}

export default EmailSubmit
