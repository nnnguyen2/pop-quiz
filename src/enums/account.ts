export const emptyAccount = {
  username: '',
  password: '',
  email: ''
}

export enum LOGIN_STEP {
  FORM = 1,
  OTP = 2
}

export enum FORGOT_STEP {
  EMAIL = 1,
  OTP = 2,
  CHANGE_PASSWORD = 3
}
