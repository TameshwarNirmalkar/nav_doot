'use client';

import { CheckCircleFilled, UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Divider, Flex, List, Typography } from 'antd';
import React, { memo } from 'react';

// Assuming 'profile.jpg' is available/imported, or you can use a public URL.

const { Title, Text, Paragraph } = Typography;

// --- Data Structure ---
const userData = {
  fullName: 'Emily Johnson',
  email: 'johnson@example.com',
  isVerified: true,
  profilePictureUrl: null,
  details: [
    { label: 'Full name', value: 'Emily Johnson' },
    { label: 'Date of Birth', value: 'January 1, 1987' },
    { label: 'Gender', value: 'Female' },
    { label: 'Nationality', value: 'American' },
    { label: 'Address', value: 'California - United States' },
    { label: 'Phone Number', value: '(213) 555-1234' },
    { label: 'Email', value: 'johnson@example.com' },
  ],
};

// --- Profile Card Component ---

const UserProfileCard = () => {
  return (
    <Card style={{ padding: 20 }}>
      {/* 1. Header Section (Avatar and Name) */}
      <Flex gap={10} className="flex-col pb-10">
        {/* Avatar with the image */}
        <div className="py-5">
          <Avatar size={90} src={userData.profilePictureUrl} icon={<UserOutlined />} />
        </div>

        {/* Name and Email */}
        <div className="">
          <Title level={3} style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
            {userData.fullName}
            {userData.isVerified && <CheckCircleFilled style={{ color: '#1890ff', fontSize: 18, marginLeft: 8 }} title="Verified" />}
          </Title>
          <Text type="secondary">{userData.email}</Text>
        </div>
      </Flex>

      <Divider size="large" />

      {/* 2. Personal Details Section */}

      <Title level={5}>Personal details</Title>

      <List
        className=""
        bordered
        itemLayout="horizontal"
        dataSource={userData.details}
        renderItem={(item) => (
          <List.Item>
            <div className="grid grid-cols-4 gap-4 w-full">
              <div>
                <Text strong>{item.label}:</Text>
              </div>
              <div>
                <Paragraph style={{ margin: 0 }}>{item.value}</Paragraph>
              </div>
            </div>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default memo(UserProfileCard);
