'use client';

import IconLoader from '@src/components/IconLoader/IconLoader';
import TableComponent from '@src/components/Tables/TableComponent';
import { Card, Flex, Space, Tag } from 'antd';
import { verify } from 'crypto';
import React, { memo } from 'react';
import { MdClose, MdOutlineCheck } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';

export default memo(function TeamWrapper() {
  const teamCol = [
    {
      title: '#Id',
      dataIndex: 'id',
      key: 'id',
      // filters: filterFields.countryName,
      // filterIcon: <RiFilter3Fill size={20} />,
      // onFilter: (value: string, record: any) => {
      //   return record.pincode.toLowerCase() === value;
      // },
      filterMultiple: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      // filters: filterFields.cityName,
      // filterIcon: <RiFilter3Fill size={20} />,
      // onFilter: (value: string | number | boolean, record: any) => {
      //   return record.name.toLowerCase() === value;
      // },
      filterMultiple: true,
    },
    {
      title: 'Verified',
      dataIndex: 'verified',
      key: 'verified',
      render: (bool: string, row: any) => <Flex justify="center">{row.verified ? <MdOutlineCheck size={20} className="text-red-700" /> : <MdClose size={20} className="text-green-700" />}</Flex>,
    },
  ];
  const teamList = [
    {
      id: uuidv4(),
      email: 'test@amazon.com',
      verified: false,
    },
    {
      id: uuidv4(),
      email: 'test2@amazon.com',
      verified: true,
    },
  ];
  return (
    <Card
      title={
        <Space>
          <div>Team List</div>
        </Space>
      }
      extra={
        <Space>
          <IconLoader showLoader={true} />
        </Space>
      }>
      <TableComponent rowKey={'id'} columns={teamCol} dataSource={teamList} bordered pagination={false} />
    </Card>
  );
});
