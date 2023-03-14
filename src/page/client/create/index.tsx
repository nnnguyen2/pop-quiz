import { Modal, Form, InputNumber, Select } from 'antd'
import { find } from 'lodash'

import { adminProducts, sizes, sizePrices, type Product } from 'mock'
import { PROCESS_STATUS } from 'enums'

const { Option } = Select

interface Props {
  onCancel: () => void
  onOk: (values: Product) => void
  open: boolean
}

const CreateProductModal: React.FC<Props> = ({ onCancel, onOk, open }) => {
  const [form] = Form.useForm()

  const sizeCalculator: () => string = () => {
    const weight = form.getFieldValue('weight')
    if (weight === undefined || weight === null) return 'M'
    const size =
      find(
        Object.entries(sizes),
        ([key, [min, max]]: [string, [number, number]]) => {
          if (weight >= min && weight <= max) {
            return true
          }
          return false
        }
      ) ?? 'M'
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
    <Modal
      cancelText='Cancel'
      okText='Create'
      open={open}
      title='Create a request clothe'
      onCancel={() => {
        form.resetFields()
        onCancel()
      }}
      onOk={async () => {
        const values = await form.validateFields()
        const product = find(adminProducts, { key: values.name })
        onOk({
          key: '',
          name: product.name,
          images: product.images,
          size: sizeCalculator(),
          quantity: values.quantity,
          price: priceCalculator(),
          status: PROCESS_STATUS.PENDING,
          upload_by: 'Client'
        })
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
            <Option value='1'>Cardigan Knit</Option>
            <Option value='2'>Leather Biker Premium</Option>
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
  )
}

export default CreateProductModal
