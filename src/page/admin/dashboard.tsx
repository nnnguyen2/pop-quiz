import { useState } from 'react'
import { Typography, Table, Button, Tag, Modal, notification } from 'antd'

import { Layout } from 'components'
import { adminProducts, type Product } from 'mock'

import styles from './style.module.scss'

const { Title } = Typography
const { confirm } = Modal

const Dashboard: React.FC = () => {
  const [list, setList] = useState<Product[]>(adminProducts)
  const [selected, setSelected] = useState<string[]>([])

  const getTag: (value: number) => string[] | undefined = (value) => {
    if (value > 3 || value < 0) {
      return
    }
    return {
      0: ['processing', 'Pending'],
      1: ['success', 'Approve'],
      2: ['error', 'Reject']
    }[value]
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Images',
      dataIndex: 'images',
      key: 'images',
      render: (value: string[], { name }: { name: string }) =>
        value.map((item, index) => (
          <div key={`product-${index}`}>
            <a href={item} rel='noreferrer' target='_blank'>
              Image {name} {index + 1}
            </a>
          </div>
        ))
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size'
    },
    {
      title: 'Price($)',
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (value: number) => {
        const tag = getTag(value)
        if (tag === undefined) return null
        return <Tag color={tag[0]}>{tag[1]}</Tag>
      }
    },
    {
      title: 'Upload By',
      dataIndex: 'upload_by',
      key: 'upload_by'
    }
  ]

  const showConfirm: (status: number) => () => void = (status) => {
    return () =>
      confirm({
        icon: null,
        title: 'Do you want update status of this products ?',
        onOk: () => {
          notification.success({ message: 'Update success!' })
          setList((prev) =>
            prev.map((item) =>
              selected.includes(item.key) ? { ...item, status } : item
            )
          )
          setSelected([])
        }
      })
  }

  return (
    <Layout>
      <Title>
        Manager
        <div className={styles.action}>
          <Button
            disabled={selected.length < 1}
            type='primary'
            onClick={showConfirm(1)}
          >
            Approve
          </Button>
          <Button
            disabled={selected.length < 1}
            type='primary'
            danger
            onClick={showConfirm(2)}
          >
            Reject
          </Button>
        </div>
      </Title>
      <Table
        columns={columns}
        dataSource={list}
        rowSelection={{
          getCheckboxProps: (record) => ({
            disabled: record.status !== 0
          }),
          selectedRowKeys: selected,
          onChange: (newSelected: any[]) => {
            setSelected(newSelected)
          }
        }}
        scroll={{
          x: 1200
        }}
      />
    </Layout>
  )
}

export default Dashboard
