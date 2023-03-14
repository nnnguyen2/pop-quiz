import { type ReactNode } from 'react'
import { Tag } from 'antd'

export const getTag: (value: number) => ReactNode | undefined = (value) => {
  const tag = {
    0: ['processing', 'Pending'],
    1: ['success', 'Approve'],
    2: ['error', 'Reject']
  }[value]

  if (value > 3 || value < 0 || tag === undefined) {
    return undefined
  }

  return <Tag color={tag[0]}>{tag[1]}</Tag>
}
