'use client';

import { CheckCircleFilled, UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Divider, Flex, List, Typography } from 'antd';
import React, { memo } from 'react';
import { FaCheck, FaCheckCircle } from 'react-icons/fa';
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import { TbEdit } from 'react-icons/tb';

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
    <Card title="My Profile">
      {/* 1. Header Section (Avatar and Name) */}
      <Flex gap={5} className="flex-col pb-10">
        <div className="py-5">
          <Flex align="center">
            <Avatar size={90} src={userData.profilePictureUrl} icon={<UserOutlined />} />
            <TbEdit size={20} color="green" className="cursor-pointer" />
          </Flex>
        </div>

        {/* Name and Email */}
        <Flex gap={5} align="center">
          <span className="text-3xl">{userData.fullName}</span>
          <Text>{userData.isVerified && <RiVerifiedBadgeFill size={20} color="#0253c7" />}</Text>
        </Flex>
        <span>{userData.email}</span>
      </Flex>

      <Divider size="large" />

      {/* 2. Personal Details Section */}
      <Card title={<span className="text-1xl">Personal details</span>} extra={<TbEdit size={20} className="cursor-pointer" color="green" />}>
        <List
          className=""
          bordered={false}
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
    </Card>
  );
};

export default memo(UserProfileCard);
