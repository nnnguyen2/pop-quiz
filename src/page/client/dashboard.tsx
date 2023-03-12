import { Card, Col, Row, Typography, Pagination } from 'antd'

import { Layout } from 'components'

const { Title } = Typography
const { Meta } = Card

const Dashboard: React.FC = () => {
  return (
    <Layout>
      <Title>Products</Title>

      <Row>
        <Col>
          <Card
            cover={
              <img
                alt='example'
                src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
              />
            }
            style={{ width: 240 }}
            hoverable
          >
            <Meta description='www.instagram.com' title='Europe Street beat' />
          </Card>
        </Col>
      </Row>

      <Pagination />
    </Layout>
  )
}

export default Dashboard
