export const status = {
  pending: 0,
  approve: 1,
  reject: 2
}

export interface Product {
  key: string
  name: string
  description?: string
  images?: string[]
  size: string
  quantity: number
  price: number
  status: number
  upload_by: string
}

export const adminProducts: Product[] = [
  {
    key: '1',
    name: 'Cardigan Knit',
    images: [
      'https://product.hstatic.net/1000026602/product/dsc02421_6498f291214b4d6dac1d67e9219ae064_master.jpg'
    ],
    size: 'XL',
    quantity: 10,
    price: 500,
    status: 0,
    upload_by: 'Client'
  },
  {
    key: '2',
    name: 'Leather Biker Premium',
    images: [
      'https://product.hstatic.net/1000026602/product/dsc00385_45b36d43206445d6b215cf30cd4042b5_master.jpg'
    ],
    size: 'L',
    quantity: 5,
    price: 700,
    status: 1,
    upload_by: 'Client'
  }
]

export const sizes: Record<string, [number, number]> = {
  M: [40, 51],
  L: [52, 59],
  XL: [60, 69],
  XXL: [70, 78],
  XXXL: [79, 90]
}

export const sizePrices: Record<string, number> = {
  M: 200,
  L: 250,
  XL: 300,
  XXL: 350,
  XXXL: 400
}
