import { useState } from 'react'
import { Typography, Button } from 'antd'
import { useNavigate } from 'react-router-dom'

import EmailSubmit from './email_submit'
import NewPassword from './new_password'
import styles from 'module_styles/_page.module.scss'

import { OtpConfirm } from 'components'
import { FORGOT_STEP } from 'enums'

const { Title } = Typography

const Forgot: React.FC = () => {
  const navigate = useNavigate()

  const [step, setStep] = useState<FORGOT_STEP>(FORGOT_STEP.EMAIL)

  const nextStep: () => void = () => {
    setStep((prev) => prev + 1)
  }

  return (
    <div className={styles.page}>
      <div className={styles.form}>
        <Title>Forgot Password</Title>
        {step === 1 && <EmailSubmit onFinish={nextStep} />}
        {step === 2 && <OtpConfirm okText='Next' onFinish={nextStep} />}
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
