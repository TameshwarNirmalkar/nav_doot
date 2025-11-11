'use client';

import IconLoader from '@src/components/IconLoader/IconLoader';
import SelectWithAdd from '@src/components/SelectWithAdd/SelectWithAdd';
import TableComponent from '@src/components/Tables/TableComponent';
import { useAppDispatch, useAppSelector } from '@src/store/redux_hooks';
import { getAllTeams } from '@src/store/team';
import { addTeamAction, getTeamListAction, updateTeamAction } from '@src/store/team/action';
import { Button, Card, Col, Drawer, Flex, Form, Input, Row, Space, Switch, Tag } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { BsFillSendCheckFill } from 'react-icons/bs';
import { MdClose, MdOutlineCheck } from 'react-icons/md';
import { RiCloseLine } from 'react-icons/ri';
import { v4 as uuidv4 } from 'uuid';

export default memo(function TeamWrapper() {
  const dispatch = useAppDispatch();
  const teamList = useAppSelector(getAllTeams);
  const [teamForm] = useForm();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [roleList, setRoleList] = useState<{ field_name: string; field_id: string }[]>([
    { field_name: 'User', field_id: 'USER' },
    { field_name: 'Admin', field_id: 'ADMIN' },
    { field_name: 'Branch Head', field_id: 'BRANCH_HEAD' },
  ]);
  const [moduleList, setModuleList] = useState<{ field_name: string; field_id: string }[]>([
    { field_name: 'Dashboard', field_id: 'DASHBOARD' },
    { field_name: 'Booking', field_id: 'BOOKING' },
    { field_name: 'Outscan/Inscan', field_id: 'OUT_IN_SCAN' },
    { field_name: 'Delivery', field_id: 'DELIVERY' },
    { field_name: 'POD Management', field_id: 'POD_MANAGEMENT' },
    { field_name: 'Tracking', field_id: 'TRACKING' },
    { field_name: 'Analytics', field_id: 'ANALYTICS' },
    { field_name: 'Network', field_id: 'NETWORK' },
    { field_name: 'Contracts', field_id: 'CONTRACTS' },
    { field_name: 'Settings', field_id: 'SETTINGS' },
  ]);

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
      width: 320,
    },
    {
      title: 'Module Name',
      dataIndex: 'module_name',
      key: 'module_name',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Active',
      dataIndex: 'verified',
      key: 'verified',
      width: 120,
      render: (bool: string, row: any) => <Flex justify="center">{row.active ? <MdOutlineCheck size={20} className="text-green-700" /> : <MdClose size={20} className="text-red-700" />}</Flex>,
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      render: (text: string, row: any) => (
        <Flex align="center" justify="center">
          {/* {!row.verified && <BsFillSendCheckFill size={20} className="text-red-700 cursor-pointer" />} */}
          <Switch size="small" checked={row.active} onChange={(checked: boolean) => dispatch(updateTeamAction({ ...row, active: checked }))} />
        </Flex>
      ),
    },
  ];

  const onSave = useCallback(async () => {
    const val = await teamForm.getFieldsValue();
    dispatch(addTeamAction({ ...val, id: uuidv4(), verified: true, active: true }));
    teamForm.resetFields();
    setIsCollapsed(false);
  }, [dispatch, teamForm]);

  const onDrawerOpen = useCallback(() => {
    setIsCollapsed(true);
  }, []);

  const onDrawerClose = useCallback(() => {
    setIsCollapsed(false);
  }, []);

  return (
    <>
      <Card
        title={
          <Space>
            <div>Team List</div>
          </Space>
        }
        extra={
          <Space>
            <Button type="primary" onClick={onDrawerOpen}>
              Add Team
            </Button>
            {/* <IconLoader showLoader={true} /> */}
          </Space>
        }>
        <TableComponent rowKey={'id'} columns={teamCol} dataSource={teamList} bordered pagination={false} />
      </Card>

      <Drawer
        width={520}
        title={
          <Flex justify="space-between">
            <span>Team Detail</span>
            <RiCloseLine size={20} onClick={onDrawerClose} className="cursor-pointer" />
          </Flex>
        }
        open={isCollapsed}
        closable={false}
        maskClosable={false}
        footer={
          <Flex justify="end">
            <Space>
              <Button onClick={onDrawerClose} disabled={isLoading}>
                Cancel
              </Button>
              <Button type="primary" onClick={onSave} disabled={isLoading} icon={isLoading ? <IconLoader showLoader={isLoading} iconSize={20} /> : null}>
                Save
              </Button>
            </Space>
          </Flex>
        }>
        <div className="flex flex-col gap-3">
          <Form form={teamForm} layout="vertical">
            <Form.Item name="country_name" hidden>
              <Input hidden />
            </Form.Item>
            <Form.Item name="module_name" hidden>
              <Input hidden />
            </Form.Item>
            <SelectWithAdd
              loadingState={false}
              dropDownList={moduleList}
              formItemLabel="Module Name"
              field_id="module_name"
              buttonLabel="Add Module"
              onAddHandler={(val) => {
                console.log('abd');
                // setRoleList((prev) => prev.concat({ field_name: val, field_id: val.toUpperCase() }));
              }}
            />

            <SelectWithAdd
              loadingState={false}
              dropDownList={roleList}
              formItemLabel="Role"
              field_id="role"
              buttonLabel="Add Role"
              onAddHandler={(val) => {
                console.log('abd');
                setRoleList((prev) => prev.concat({ field_name: val, field_id: val.toUpperCase() }));
              }}
            />
          </Form>
        </div>
      </Drawer>
    </>
  );
});
