'use client';

import TableComponent from '@src/components/Tables/TableComponent';
import { useAppSelector } from '@src/store/redux_hooks';
import { selectZoneList } from '@src/store/zone';

import { Space, Table } from 'antd';
import React, { memo } from 'react';
import { BiEdit, BiTrash } from 'react-icons/bi';

export default memo(function ZoneTable() {
  const allZones = useAppSelector(selectZoneList);
  const zone_coloumns = [
    {
      title: 'Zone Id',
      dataIndex: 'zone_id',
      key: 'zone_id',
      width: 120,
    },
    {
      title: 'Zone Name',
      dataIndex: 'zone_name',
      key: 'zone_name',
    },
    {
      title: 'Action',
      dataIndex: 'zone_name',
      key: 'zone_name',
      width: 100,
      render: (text: string) => (
        <Space>
          <BiEdit size={18} className="cursor-pointer text-green-600" />
          <BiTrash size={18} className="cursor-pointer text-red-700" />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <TableComponent rowKey={'zone_id'} columns={zone_coloumns} dataSource={allZones} />
    </div>
  );
});
