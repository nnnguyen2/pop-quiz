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
