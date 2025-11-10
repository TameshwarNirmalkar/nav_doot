'use client';

import IconLoader from '@src/components/IconLoader/IconLoader';
import TableComponent from '@src/components/Tables/TableComponent';
import { useAppDispatch, useAppSelector } from '@src/store/redux_hooks';
import { getAllTeams } from '@src/store/team';
import { addTeamAction, getTeamListAction } from '@src/store/team/action';
import { Button, Card, Col, Flex, Form, Input, Row, Space, Tag } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { memo, useCallback, useEffect } from 'react';
import { BsFillSendCheckFill } from 'react-icons/bs';
import { MdClose, MdOutlineCheck } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';

export default memo(function TeamWrapper() {
  const dispatch = useAppDispatch();
  const teamList = useAppSelector(getAllTeams);
  const [teamForm] = useForm();

  useEffect(() => {
    dispatch(getTeamListAction());
  }, [dispatch]);

  const teamCol: any = [
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
      width: 120,
      render: (bool: string, row: any) => <Flex justify="center">{row.verified ? <MdOutlineCheck size={20} className="text-green-700" /> : <MdClose size={20} className="text-red-700" />}</Flex>,
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      render: (text: string, row: any) => (
        <Flex align="center" justify="center">
          {!row.verified && <BsFillSendCheckFill size={20} className="text-red-700 cursor-pointer" />}
        </Flex>
      ),
    },
  ];

  const onFormAction = useCallback(
    (val: any) => {
      dispatch(addTeamAction({ ...val, id: uuidv4() }));
      teamForm.resetFields();
    },
    [dispatch, teamForm],
  );

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
      <Form form={teamForm} layout="horizontal" onFinish={onFormAction} initialValues={{ id: '', email: '', verified: false }}>
        <Row gutter={10}>
          <Col span={6}>
            <Form.Item name={'email'}>
              <Input placeholder="test@gmail.com" />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add Email
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <TableComponent rowKey={'id'} columns={teamCol} dataSource={teamList} bordered pagination={false} />
    </Card>
  );
});
