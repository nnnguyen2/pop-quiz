export interface Account {
  username: string
  password: string
}

export const clientAccount = {
  username: 'client',
  password: '123456'
}

export const adminAccount = {
  username: 'admin',
  password: '123456'
}

export const accounts = [clientAccount, adminAccount]
