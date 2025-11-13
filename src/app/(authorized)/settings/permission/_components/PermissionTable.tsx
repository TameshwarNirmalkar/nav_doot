import { CreateStandardFilter } from '@src/components/Tables/FilterComponent';
import TableComponent from '@src/components/Tables/TableComponent';
import { Checkbox, Flex, Switch } from 'antd';
import React, { memo } from 'react';

export default memo(function PermissionTable() {
  const permissionCol: any = [
    {
      title: 'Module Name',
      dataIndex: 'module_name',
      key: 'module_name',
      ...CreateStandardFilter(
        [
          { text: 'Dashboard', value: 'dashboard' },
          { text: 'Booking', value: 'booking' },
          { text: 'Delivery', value: 'delivery' },
          { text: 'Tracking', value: 'tracking' },
        ],
        'module_name',
      ),
    },
    // {
    //   title: 'Email',
    //   dataIndex: 'email',
    //   key: 'email',
    //   ...CreateStandardFilter(
    //     [
    //       { text: 'test@test.com', value: 'test@test.com' },
    //       { text: 'dhiraj@gmail.com', value: 'dhiraj@gmail.com' },
    //       { text: 'jiwan.nishad@gmail.com', value: 'jiwan.nishad@gmail.com' },
    //       { text: 'harish.verma@gmail.com', value: 'harish.verma@gmail.com' },
    //     ],
    //     'module_name',
    //   ),
    // },
    {
      title: <Flex justify="center">Read</Flex>,
      dataIndex: 'read',
      key: 'read',
      width: 150,
      render: (bool: string, row: any) => (
        <Flex justify="center">
          <Checkbox checked={row.read} onChange={(e) => console.log(`Checkbox in row ${row.key} changed to ${e.target.checked}`)} />
        </Flex>
      ),
    },
    {
      title: <Flex justify="center">Write</Flex>,
      dataIndex: 'write',
      key: 'write',
      width: 150,
      render: (bool: string, row: any) => (
        <Flex justify="center">
          <Checkbox checked={row.write} onChange={(e) => console.log(`Checkbox in row ${row.key} changed to ${e.target.checked}`)} />
        </Flex>
      ),
    },
    {
      title: <Flex justify="center">Delete</Flex>,
      dataIndex: 'delete',
      key: 'delete',
      width: 150,
      render: (bool: string, row: any) => (
        <Flex justify="center">
          <Checkbox checked={row.delete} onChange={(e) => console.log(`Checkbox in row ${row.key} changed to ${e.target.checked}`)} />
        </Flex>
      ),
    },
    {
      title: <Flex justify="center">ReadOnly</Flex>,
      dataIndex: 'read_only',
      key: 'read_only',
      width: 150,
      render: (bool: string, row: any) => (
        <Flex justify="center">
          <Checkbox checked={row.read_only} onChange={(e) => console.log(`Checkbox in row ${row.key} changed to ${e.target.checked}`)} />
        </Flex>
      ),
    },
    // {
    //   title: <Flex justify="center">Action</Flex>,
    //   dataIndex: 'id',
    //   key: 'id',
    //   width: 120,
    //   render: (text: string, row: any) => (
    //     <Flex align="center" justify="center" gap={8}>
    //       <Switch size="small" checked={row.active} onChange={(checked: boolean) => console.log('fsdffdfdsfsafd', checked)} />
    //     </Flex>
    //   ),
    // },
  ];

  const permissionList = [
    {
      id: 1,
      module_name: 'Dashboard',
      email: 'test@test.com',
      read: false,
      write: false,
      delete: false,
      read_only: true,
    },
    {
      id: 2,
      module_name: 'Booking',
      email: 'dhiraj@gmail.com',
      read: true,
      write: true,
      delete: true,
      read_only: true,
    },
    {
      id: 3,
      module_name: 'Delivery',
      email: 'jiwan.nishad@gmail.com',
      read: false,
      write: true,
      delete: false,
      read_only: false,
    },
    {
      id: 4,
      module_name: 'Tracking',
      email: 'harish.verma@gmail.com',
      read: false,
      write: false,
      delete: true,
      read_only: false,
    },
  ];

  return <TableComponent rowKey={'id'} columns={permissionCol} dataSource={permissionList} bordered pagination={false} />;
});
