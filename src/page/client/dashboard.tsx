import { type ReactNode, useState } from 'react'
import {
  Card,
  Col,
  Row,
  Typography,
  Tag,
  Button,
  Modal,
  Form,
  InputNumber,
  Select
} from 'antd'
import { find } from 'lodash'

import { Layout } from 'components'
import { adminProducts, sizes, sizePrices } from 'mock'
import styles from './style.module.scss'

const { Title } = Typography
const { Meta } = Card
const { Option } = Select

const Dashboard: React.FC = () => {
  const [form] = Form.useForm()
  const [open, setOpen] = useState<boolean>(false)

  const getTag: (value: number) => ReactNode | undefined = (value) => {
    const tag = {
      0: ['processing', 'Pending'],
      1: ['success', 'Approve'],
      2: ['error', 'Reject']
    }[value]

    if (value > 3 || value < 0 || tag === undefined) {
      return null
    }

    return <Tag color={tag[0]}>{tag[1]}</Tag>
  }

  const sizeCalculator: () => string = () => {
    const weight = form.getFieldValue('weight')
    if (weight === undefined || weight === null) return 'M'
    const size = find(
      Object.entries(sizes),
      ([key, [min, max]]: [string, [number, number]]) => {
        if (weight > min && weight < max) {
          return true
        }
        return false
      }
    )
    if (size === undefined) return 'M'
    return size[0]
  }

  const priceCalculator: () => number = () => {
    const quantity = form.getFieldValue('quantity')
    if (quantity === undefined || quantity === null) return 0
    const size = sizeCalculator()
    const sizePrice = sizePrices[size]
    return quantity * sizePrice
  }

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
        {adminProducts.map((item, index: number) => (
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

      <Modal
        cancelText='Cancel'
        okText='Create'
        open={open}
        title='Create a request clothe'
        onCancel={() => {
          form.resetFields()
          setOpen(false)
        }}
        onOk={() => {
          setOpen(false)
        }}
      >
        <Form
          form={form}
          initialValues={{ modifier: 'public' }}
          layout='vertical'
          name='form_in_modal'
        >
          <Form.Item
            label='Name'
            name='name'
            rules={[{ required: true, message: 'Please select the clothe!' }]}
          >
            <Select placeholder='Please select a clothe'>
              <Option value='cardigan_knit'>Cardigan Knit</Option>
              <Option value='leather_biker_premium'>
                Leather Biker Premium
              </Option>
            </Select>
          </Form.Item>

          <Form.Item
            label='Weight'
            name='weight'
            rules={[
              {
                required: true,
                message: 'Please input the weight!'
              }
            ]}
          >
            <InputNumber max={90} min={40} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label='Size'
            shouldUpdate={(prevValues, curValues) =>
              prevValues.weight !== curValues.weight
            }
          >
            {() => <span className='ant-form-text'>{sizeCalculator()}</span>}
          </Form.Item>

          <Form.Item
            label='Quantity'
            name='quantity'
            rules={[
              {
                required: true,
                message: 'Please input the quantity!'
              }
            ]}
          >
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label='Price'
            shouldUpdate={(prevValues, curValues) =>
              prevValues.weight !== curValues.weight ||
              prevValues.quantity !== curValues.quantity
            }
          >
            {() => <span className='ant-form-text'>{priceCalculator()} $</span>}
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  )
}

export default Dashboard
