'use client';

import { Card, Col, Descriptions, Divider, Row, Typography } from 'antd';
import React, { memo } from 'react';

const { Title } = Typography;

// 1. Define the TypeScript interface for the data structure
interface BookingSummaryData {
  awbNumber: string;
  pickupAddress: string;
  deliveryAddress: string;
  bookingDate: string;
  numberOfPackets: number;
  packetType: string;
  actualWeight: number;
  volumetricWeight: number;
  receiverPhoneNo: string;
  gstRequired: boolean;
  gstNumber: string;
  ewayBillNumber: string;
  ewayExpiryDate: string;
  netAmount: number;
  totalCost: number;
}

// 2. Mock Data (This is the data you would pass into the component)
const bookingData: BookingSummaryData = {
  awbNumber: 'AWB12345678',
  pickupAddress: '123 Main Street, Industrial Area, Mumbai - 400001',
  deliveryAddress: '456 Tech Park, Electronic City, Bangalore - 560100',
  bookingDate: '2025-11-15',
  numberOfPackets: 2,
  packetType: 'Box',
  actualWeight: 5.5, // in kg
  volumetricWeight: 7.2, // in kg
  receiverPhoneNo: '+91 9876543210',
  gstRequired: true,
  gstNumber: '27AAAAA1234A1Z5',
  ewayBillNumber: 'EB-987654321',
  ewayExpiryDate: '2025-11-20',
  netAmount: 4451.0,
  totalCost: 6941.0,
};

const BookingSummaryDescription: React.FC = () => {
  const { awbNumber, pickupAddress, deliveryAddress, bookingDate, numberOfPackets, packetType, actualWeight, volumetricWeight, receiverPhoneNo, gstRequired, gstNumber, ewayBillNumber, ewayExpiryDate, netAmount, totalCost } = bookingData;

  return (
    <Card title={<Title level={5}>📦 Booking Summary</Title>} style={{}}>
      {/* --- Shipment Details Section --- */}
      <Descriptions bordered column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }} size="middle" labelStyle={{ width: 200 }}>
        <Descriptions.Item label="AWB (Waybill Number)">{awbNumber}</Descriptions.Item>
        <Descriptions.Item label="Pickup Address">{pickupAddress}</Descriptions.Item>
        <Descriptions.Item label="Delivery Address">{deliveryAddress}</Descriptions.Item>
        <Descriptions.Item label="Booking Date">{bookingDate}</Descriptions.Item>
        <Descriptions.Item label="Number of Packet's">{numberOfPackets}</Descriptions.Item>
        <Descriptions.Item label="Packet Type">{packetType}</Descriptions.Item>
        <Descriptions.Item label="Actual Weight">{actualWeight} Kg</Descriptions.Item>
        <Descriptions.Item label="Volumetric Weight">{volumetricWeight} Kg</Descriptions.Item>
        <Descriptions.Item label="Reciever Phone No">{receiverPhoneNo}</Descriptions.Item>
      </Descriptions>

      <Divider />

      {/* --- Financial Summary Section --- */}
      <Card size="small" style={{ backgroundColor: '#e6f7ff', border: '1px solid #91d5ff', marginBottom: 16 }}>
        <div className="flex flex-row gap-2 justify-between">
          <Title level={5} style={{ margin: 0 }}>
            NET AMOUNT :
          </Title>
          <Title level={5} style={{ margin: 0, color: '#096dd9' }}>
            Rs. {netAmount.toFixed(2)}
          </Title>
        </div>
      </Card>

      {/* --- GST/Eway Bill Required Checkbox (Simulated) --- */}
      <Descriptions title="GST/Eway Bill Required" bordered column={1} size="small" style={{ marginBottom: 16 }} labelStyle={{ width: 200 }}>
        <Descriptions.Item label="Required">{gstRequired ? '☑️ YES' : '⬜ NO'}</Descriptions.Item>
      </Descriptions>

      {/* --- GST/Eway Details (Conditional Display) --- */}
      {gstRequired && (
        <Descriptions title="GST & Eway Bill Details" bordered column={1} size="small" labelStyle={{ width: 200 }}>
          <Descriptions.Item label="GST Number">{gstNumber}</Descriptions.Item>
          <Descriptions.Item label="Eway Bill Number">{ewayBillNumber}</Descriptions.Item>
          <Descriptions.Item label="Eway Expiry Date">{ewayExpiryDate}</Descriptions.Item>
        </Descriptions>
      )}

      <Divider />

      {/* --- TOTAL COST --- */}
      <Card
        size="small"
        style={{
          backgroundColor: '#bae637',
          border: '1px solid #52c41a',
        }}>
        <div className="flex flex-row gap-2 justify-between">
          <Title level={5} style={{ margin: 0 }}>
            TOTAL COST :
          </Title>
          <Title level={5} style={{ margin: 0, color: '#389e0d' }}>
            Rs. {totalCost.toFixed(2)}
          </Title>
        </div>
      </Card>
    </Card>
  );
};

export default memo(BookingSummaryDescription);
