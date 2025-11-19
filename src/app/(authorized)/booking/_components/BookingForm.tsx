'use client';

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Col, DatePicker, Divider, Form, Input, Row, Select, Typography } from 'antd';
import React, { memo } from 'react';

const { Option } = Select;
const { Title, Text } = Typography;

const packageTypes = ['Document', 'Non-Document'];

const BookingForm = () => {
  const form = Form.useFormInstance();

  // const onFinish = (values: any) => {
  //   console.log('Received values of form: ', values);
  //   // Handle form submission logic here (e.g., API call)
  // };

  // Function to calculate Chargeable Weight
  const calculateVolumetricWeight = () => {
    const { packageDimensions } = form.getFieldsValue();
    if (packageDimensions) {
      const { length, breadth, height } = packageDimensions;
      // Simple example calculation: (L x B x H) / 5000 (common divisor for volumetric weight)
      // Note: The actual divisor might vary (e.g., 455 or 5000), check with the courier company.
      const volumetricWeight = (length * breadth * height) / 455;
      form.setFieldsValue({ volumetricWeight: volumetricWeight.toFixed(2) }); // Set to 2 decimal places
    }
  };

  return (
    <>
      {/* --- Booking Details --- */}
      <Card
        type="inner"
        title={
          <Title level={5}>
            Booking Details <Text type="danger">*</Text>
          </Title>
        }
        className="">
        <Row gutter={10}>
          <Col span={12}>
            <Form.Item label="AWB (Waybill Number)" name="awbNumber" rules={[{ required: true, message: 'Required' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Booking Branch" name="branch" rules={[{ required: true, message: 'Required' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Booking Date" name="bookingDate" rules={[{ required: true, message: 'Required' }]}>
              {/* <Input type="date" /> */}
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Product" name="product" rules={[{ required: true, message: 'Required' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Card>
      {/* --- Delivery Address Details --- */}
      <Card
        style={{ marginTop: 16 }}
        type="inner"
        title={
          <Title level={5}>
            Address Details <Text type="danger">*</Text>
          </Title>
        }>
        <Text strong>Delivery Address</Text>
        <Row gutter={10}>
          <Col span={12}>
            <Form.Item label="Full Name" name={['deliveryAddress', 'fullName']} rules={[{ required: true, message: 'Required' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Mobile Number" name={['deliveryAddress', 'mobileNumber']} rules={[{ required: true, message: 'Required' }]}>
              <Input type="tel" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={12}>
            <Form.Item label="Postal Code" name={['deliveryAddress', 'postalCode']} rules={[{ required: true, message: 'Required' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Address 1" name={['deliveryAddress', 'address1']} rules={[{ required: true, message: 'Required' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={12}>
            <Form.Item label="City" name={['deliveryAddress', 'city']} rules={[{ required: true, message: 'Required' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Address 2" name={['deliveryAddress', 'address2']}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={12}>
            <Form.Item label="State" name={['deliveryAddress', 'state']} rules={[{ required: true, message: 'Required' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>{/* Empty Col for alignment */}</Col>
        </Row>
        <Row gutter={10}>
          <Col span={12}>
            <Form.Item label="Country" name={['deliveryAddress', 'country']} rules={[{ required: true, message: 'Required' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        {/* --- Pickup Address Details --- */}
        <Text strong>Pickup Address</Text>
        <Form.Item name="useProfileAsPickup" valuePropName="checked" style={{ marginBottom: '10px' }}>
          <Checkbox>Use my profile address as pickup address</Checkbox>
        </Form.Item>

        <Form.Item noStyle shouldUpdate>
          {({ getFieldValue }) =>
            !getFieldValue('useProfileAsPickup') ? (
              <Row gutter={10}>
                <Col span={12}>
                  <Form.Item label="Full Name" name={['pickupAddress', 'fullName']} rules={[{ required: true, message: 'Required' }]}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Mobile Number" name={['pickupAddress', 'mobileNumber']} rules={[{ required: true, message: 'Required' }]}>
                    <Input type="tel" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Postal Code" name={['pickupAddress', 'postalCode']} rules={[{ required: true, message: 'Required' }]}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Address 1" name={['pickupAddress', 'address1']} rules={[{ required: true, message: 'Required' }]}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="City" name={['pickupAddress', 'city']} rules={[{ required: true, message: 'Required' }]}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Address 2" name={['pickupAddress', 'address2']}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="State" name={['pickupAddress', 'state']} rules={[{ required: true, message: 'Required' }]}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Country" name={['pickupAddress', 'country']} rules={[{ required: true, message: 'Required' }]}>
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            ) : null
          }
        </Form.Item>
      </Card>
      {/* --- Package Details --- */}

      <Card
        style={{ marginTop: 16 }}
        type="inner"
        title={
          <Title level={5}>
            Package Details <Text type="danger">*</Text>
          </Title>
        }>
        <Row gutter={10}>
          <Col span={12}>
            <Form.Item label="Select the Packet type" name="packetType" rules={[{ required: true, message: 'Required' }]}>
              <Select placeholder="Select a type">
                {packageTypes.map((type) => (
                  <Option key={type} value={type}>
                    {type}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Declared Value" name="declaredValue" rules={[{ required: true, message: 'Required' }]}>
              <Input type="number" min={0} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Number of Packets" name="numberOfPackets" rules={[{ required: true, message: 'Required' }]}>
              <Input type="number" min={1} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Actual Weight" name="actualWeight" rules={[{ required: true, message: 'Required' }]}>
              <Input suffix="kg" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="calculate_chargeable_weight" valuePropName="checked">
              <Checkbox>Calculate Chargeable Weight</Checkbox>
            </Form.Item>
            <Form.Item noStyle shouldUpdate>
              {({ getFieldValue }) =>
                getFieldValue('calculate_chargeable_weight') ? (
                  <>
                    <Text strong>Package Dimensions L x B x H of the complete package</Text>
                    <Row gutter={8} align="bottom">
                      <Col span={6}>
                        <Form.Item label="Length" name={['packageDimensions', 'length']} rules={[{ required: true, message: 'L required' }]}>
                          <Input suffix="cm" onChange={calculateVolumetricWeight} />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item label="Breadth" name={['packageDimensions', 'breadth']} rules={[{ required: true, message: 'B required' }]}>
                          <Input suffix="cm" onChange={calculateVolumetricWeight} />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item label="Height" name={['packageDimensions', 'height']} rules={[{ required: true, message: 'H required' }]}>
                          <Input suffix="cm" onChange={calculateVolumetricWeight} />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item label="Volumetric Weight" name="volumetricWeight">
                          <Input suffix="kg" disabled />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Text type="secondary" style={{ display: 'block', marginTop: '5px' }}>
                      Note: The divisor '455' is used for the volumetric weight calculation in this example, which should match your courier's standard.
                    </Text>
                  </>
                ) : null
              }
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default memo(BookingForm);
