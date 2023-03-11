import { useState } from 'react'
import { Typography, Button } from 'antd'
import { useNavigate } from 'react-router-dom'

import EmailSubmit from './email_submit'
import OtpConfirm from './otp_confirm'
import NewPassword from './new_password'
import styles from 'module_styles/_page.module.scss'

const { Title } = Typography

const Forgot: React.FC = () => {
  const navigate = useNavigate()

  const [step, setStep] = useState(1)

  const nextStep: () => void = () => {
    setStep((prev) => prev + 1)
  }

  return (
    <div className={styles.page}>
      <div className={styles.form}>
        <Title>Forgot Password</Title>
        {step === 1 && <EmailSubmit onFinish={nextStep} />}
        {step === 2 && <OtpConfirm onFinish={nextStep} />}
        {step === 3 && <NewPassword />}

        {step === 1 ? (
          <Button
            type='link'
            block
            onClick={() => {
              navigate(-1)
            }}
          >
            Cancel
          </Button>
        ) : (
          <Button
            type='link'
            block
            onClick={() => {
              setStep((prev) => prev - 1)
            }}
          >
            Back
          </Button>
        )}
      </div>
    </div>
  )
}

export default Forgot
