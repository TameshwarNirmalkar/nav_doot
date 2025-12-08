import BreadcrumbComponent from '@src/components/BreadcrumbComponent/BreadcrumbComponent';
import BarChart from '@src/components/Charts/BarChart';
import PieChart from '@src/components/Charts/PieChart';
import TableComponent from '@src/components/Tables/TableComponent';
import { Breadcrumb, Card, Col, Divider, Flex, Row, Statistic } from 'antd';
import { BiSolidPlaneAlt } from 'react-icons/bi';
import { FaArrowUp, FaTrainSubway, FaTruck } from 'react-icons/fa6';

export default function SalesPage() {
  return (
    <div>
      <BreadcrumbComponent items={[{ title: 'Dashboard' }, { title: 'Sales' }]} />

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <Card title="Sales Trend">
            <PieChart />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <Card title="Service Trend">
            <BarChart />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <Card
            title={
              <Flex align="center" gap={5}>
                <FaTruck size={20} color="orange" />
                <Flex>Available Trucks</Flex>
              </Flex>
            }>
            <Statistic
              title="Active Consignment"
              value={60}
              precision={2}
              styles={{
                content: {
                  color: '#3f8600',
                },
              }}
              prefix={<FaArrowUp />}
              suffix="%"
            />
          </Card>
          <Divider size="small" />
          <Card
            title={
              <Flex align="center" gap={5}>
                <FaTrainSubway size={20} color="orange" />
                <Flex>Available Trains</Flex>
              </Flex>
            }>
            <Statistic
              title="Active Consignment"
              value={50}
              precision={2}
              styles={{
                content: {
                  color: '#3f8600',
                },
              }}
              prefix={<FaArrowUp />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={6}></Col>
      </Row>

      <Divider size="small" />
      <Row align={'middle'} gutter={[16, 16]}>
        <Col span={24}>
          <Card title="Recent Bookings">
            <TableComponent />
          </Card>
        </Col>
        <Col span={24}>
          <Card title="Sales Analysis">
            <TableComponent />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
