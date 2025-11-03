import { Button, Card, Col, Divider, Flex, Result, Row, Statistic, Typography } from 'antd';
import Link from 'next/link';
import { BiUserCircle, BiUserPlus } from 'react-icons/bi';
import { BsArrowUpCircle, BsPlusCircle } from 'react-icons/bs';

export default function CrmPage() {
  return (
    <div className="px-5 py-8">
      <div className="">
        <h1 className="text-3xl font-bold text-orange-400">Empower Your Business with NavDoot CRM</h1>
        <p className="text-lg">Streamline customer relationships, boost efficiency, and drive growth with our cutting-edge CRM solution.</p>
      </div>

      <div className="flex-grow flex items-center justify-space-between py-5">
        <div className="grid grid-cols-1 gap-8">
          <div>
            <div>
              <h2 className="text-xl font-bold mb-4">Overview</h2>
              <h3>
                NavDoot CRM is designed to enhance your customer interactions and help you stay ahead in the competitive market. With features like sales tracking, contact
                management, and insightful analytics, it's the perfect tool for modern businesses.
              </h3>
            </div>

            <Row gutter={[16, 16]} className="mt-5">
              <Col span={8}>
                <Card variant="borderless">
                  <Statistic
                    title={<h1 className="text-2xl text-black-500">Sales Traking</h1>}
                    value={11.28}
                    precision={2}
                    valueStyle={{ color: '#3f8600' }}
                    prefix={<BsArrowUpCircle />}
                    suffix="%"
                  />
                  <Divider />
                  <h3 className="mt-2">Monitor your sales pipeline, close deals faster, and improve revenue forecasts with our intuitive tracking system.</h3>
                </Card>
              </Col>
              <Col span={8}>
                <Card variant="borderless">
                  <Statistic
                    title={<h1 className="text-2xl text-black-500">Contact Management</h1>}
                    value={9.3}
                    precision={2}
                    valueStyle={{ color: 'orange' }}
                    prefix={<BiUserPlus />}
                    suffix="%"
                  />
                  <Divider />
                  <h3 className="mt-2">Monitor your sales pipeline, close deals faster, and improve revenue forecasts with our intuitive tracking system.</h3>
                </Card>
              </Col>
              <Col span={8}>
                <Card variant="borderless">
                  <Statistic
                    title={<h1 className="text-2xl text-black-500">Analytics & Reporting</h1>}
                    value={9.3}
                    precision={2}
                    valueStyle={{ color: 'orange' }}
                    prefix={<BiUserPlus />}
                    suffix="%"
                  />
                  <Divider />
                  <h3 className="mt-2">Monitor your sales pipeline, close deals faster, and improve revenue forecasts with our intuitive tracking system.</h3>
                </Card>
              </Col>
            </Row>
            <Row className="mt-5">
              <Col span={24}>
                <Card title="">
                  <Result
                    status="success"
                    title="Benefits"
                    subTitle="Whether you're a startup or an enterprise, NavDoot CRM empowers your team to achieve their goals with efficiency and precision. Boost Productivity:
                    Automate mundane tasks and focus on strategic growth. Enhance Customer Relationships: Deliver personalized experiences and build trust. Improve Decision-Making:
                    Leverage data-driven insights for smarter decisions."
                    extra={[
                      <Button type="primary" key="console">
                        Go to Dashboard
                      </Button>,
                      <Button key="buy">Buy Plan Again</Button>,
                    ]}
                  />
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}
