import TableComponent from '@src/components/Tables/TableComponent';
import { Checkbox, Flex, Switch } from 'antd';
import React, { memo } from 'react';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillSendCheckFill } from 'react-icons/bs';
import { FcDeleteColumn } from 'react-icons/fc';
import { MdClose, MdDelete, MdOutlineCheck } from 'react-icons/md';
import { RiSave3Fill } from 'react-icons/ri';
import { TiUserDelete } from 'react-icons/ti';
import { v4 as uuidv4 } from 'uuid';

export default memo(function PermissionTable() {
  const permissionCol: any = [
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
    {
      title: <Flex justify="center">Action</Flex>,
      dataIndex: 'id',
      key: 'id',
      width: 120,
      render: (text: string, row: any) => (
        <Flex align="center" justify="center" gap={8}>
          <Switch size="small" checked={row.active} onChange={(checked: boolean) => console.log('fsdffdfdsfsafd', checked)} />
        </Flex>
      ),
    },
  ];

  const permissionList = [
    {
      id: uuidv4(),
      email: 'test@test.com',
      read: false,
      write: false,
      delete: false,
      read_only: true,
    },
    {
      id: uuidv4(),
      email: 'dhiraj@gmail.com',
      read: true,
      write: true,
      delete: true,
      read_only: true,
    },
    {
      id: uuidv4(),
      email: 'jiwan.nishad@gmail.com',
      read: false,
      write: true,
      delete: false,
      read_only: false,
    },
    {
      id: uuidv4(),
      email: 'harish.verma@gmail.com',
      read: false,
      write: false,
      delete: true,
      read_only: false,
    },
  ];

  return <TableComponent rowKey={'id'} columns={permissionCol} dataSource={permissionList} bordered pagination={false} />;
});
