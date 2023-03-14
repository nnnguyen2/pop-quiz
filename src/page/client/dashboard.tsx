import { useState } from 'react'
import { Card, Col, Row, Typography, Button } from 'antd'

import { Layout } from 'components'
import { adminProducts, type Product } from 'mock'
import { getTag } from 'utils'

import CreateProductModal from './create'
import styles from './style.module.scss'

const { Title } = Typography
const { Meta } = Card

const Dashboard: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [list, setList] = useState<Product[]>(adminProducts)

  return (
    <Layout>
      <Title>
        Products
        <div className={styles.action}>
          <Button
            type='primary'
            onClick={() => {
              setOpen(true)
            }}
          >
            Create New
          </Button>
        </div>
      </Title>

      <Row gutter={16}>
        {list.map((item, index: number) => (
          <Col key={`item-${index}`} sm={6}>
            <Card
              cover={
                <img
                  alt='product'
                  src={
                    item.images?.[0] ??
                    'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
                  }
                />
              }
              style={{ width: 240 }}
              hoverable
            >
              <Meta
                description={
                  <div className={styles.cardSub}>
                    <b>{item.price}$</b>
                    {getTag(item.status)}
                  </div>
                }
                title={item.name}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <CreateProductModal
        open={open}
        onCancel={() => {
          setOpen(false)
        }}
        onOk={(values) => {
          setList((prev) => [
            ...prev,
            {
              ...values,
              key: `${prev.length + 1}`
            }
          ])
          setOpen(false)
        }}
      />
    </Layout>
  )
}

export default Dashboard
