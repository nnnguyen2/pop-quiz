export interface Account {
  username: string
  password: string
  email: string
  isAdmin?: boolean
}

export interface EmailAccount {
  email: string
}

export interface RegisterAccount extends Account {
  confirm_password: string
}

export const clientAccount = {
  username: 'client',
  password: '123456',
  email: 'client@gmail.com'
}

export const adminAccount = {
  username: 'admin',
  password: '123456',
  email: 'admin@gmail.com',
  isAdmin: true
}

export const accounts = [clientAccount, adminAccount]

export const OTP = '000000'
