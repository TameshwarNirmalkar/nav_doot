'use client';

import IconLoader from '@src/components/IconLoader/IconLoader';
import SearchComponent from '@src/components/SearchComponent/SearchComponent';
import SelectWithAdd from '@src/components/SelectWithAdd/SelectWithAdd';
import { CreateStandardFilter } from '@src/components/Tables/FilterComponent';
import TableComponent from '@src/components/Tables/TableComponent';
import { useAppDispatch, useAppSelector } from '@src/store/redux_hooks';
import { getAllTeams } from '@src/store/team';
import { addTeamAction, getTeamListAction, updateTeamAction } from '@src/store/team/action';
import { getUniqueFilters } from '@src/utility/common_function';
import { Avatar, Button, Card, Col, DatePicker, Descriptions, DescriptionsProps, Drawer, Dropdown, Flex, Form, Input, MenuProps, Popconfirm, Row, Space, Switch, Tag } from 'antd';
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import type { Dayjs } from 'dayjs';
import React, { MouseEventHandler, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { BiDotsVerticalRounded, BiUser } from 'react-icons/bi';
import { BsCalendarDate, BsFillSendCheckFill } from 'react-icons/bs';
import { FaEye } from 'react-icons/fa';
import { GrDocumentText } from 'react-icons/gr';
import { MdClose, MdOutlineCheck } from 'react-icons/md';
import { RiCloseLine, RiFilter3Fill } from 'react-icons/ri';
import { TbEdit, TbEyeCheck, TbTrash } from 'react-icons/tb';
import { v4 as uuidv4 } from 'uuid';

const { Search } = Input;
const { RangePicker } = DatePicker;

export default memo(function TeamWrapper() {
  const dispatch = useAppDispatch();
  const teamList = useAppSelector(getAllTeams);
  const [teamForm] = useForm();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isDetailsView, setIsDetailsView] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [roleList, setRoleList] = useState<{ field_name: string; field_id: string }[]>([
    { field_name: 'User', field_id: 'USER' },
    { field_name: 'Admin', field_id: 'ADMIN' },
    { field_name: 'Branch Head', field_id: 'BRANCH_HEAD' },
  ]);
  const [branchList, setBranchList] = useState<{ field_name: string; field_id: string }[]>([
    { field_name: 'Ranchi', field_id: '1' },
    { field_name: 'Raipur', field_id: '5' },
    { field_name: 'Delhi HO', field_id: '6' },
  ]);
  // const [moduleList, setModuleList] = useState<{ field_name: string; field_id: string }[]>([
  //   { field_name: 'Dashboard', field_id: 'DASHBOARD' },
  //   { field_name: 'Booking', field_id: 'BOOKING' },
  //   { field_name: 'Outscan/Inscan', field_id: 'OUT_IN_SCAN' },
  //   { field_name: 'Delivery', field_id: 'DELIVERY' },
  //   { field_name: 'POD Management', field_id: 'POD_MANAGEMENT' },
  //   { field_name: 'Tracking', field_id: 'TRACKING' },
  //   { field_name: 'Analytics', field_id: 'ANALYTICS' },
  //   { field_name: 'Network', field_id: 'NETWORK' },
  //   { field_name: 'Contracts', field_id: 'CONTRACTS' },
  //   { field_name: 'Settings', field_id: 'SETTINGS' },
  // ]);

  useEffect(() => {
    dispatch(getTeamListAction());
  }, [dispatch]);

  const onDrawerOpen = useCallback(() => {
    setIsCollapsed(true);
  }, []);

  const rowItems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div className="flex items-center gap-1">
          <TbEyeCheck size={20} />
          <span>Detail</span>
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div className="flex items-center gap-1">
          <TbEdit size={20} />
          <span>Edit</span>
        </div>
      ),
    },
  ];

  const filterFields = useMemo(() => {
    return {
      userName: getUniqueFilters(teamList, 'user_name'),
      userEmail: getUniqueFilters(teamList, 'user_email'),
      userBranch: getUniqueFilters(teamList, 'user_branch'),
      userRole: getUniqueFilters(teamList, 'role'),
      // stateName: getUniqueFilters(teamList, 'state_name'),
    };
  }, [teamList]);

  const onItemClickHandler = useCallback(
    (val: { key: string | number }) => {
      console.log('====', val);
      if (val.key === '1') {
        setIsDetailsView(true);
      } else {
        onDrawerOpen();
      }
    },
    [onDrawerOpen],
  );

  const onEditHandler = (e: MouseEventHandler<Element>, item: any) => {
    onDrawerOpen();
    teamForm.setFieldsValue({ ...item });
  };

  const onDetailsHandler = () => {
    setIsDetailsView(true);
    // teamForm.setFieldsValue({ ...item });
  };

  const teamCol: any = [
    {
      title: 'Name',
      dataIndex: 'user_name',
      key: 'user_name',
      width: 350,
      render: (text: string, row: any) => (
        <Flex align="center" gap={10}>
          <Avatar icon={<BiUser />} style={{ backgroundColor: 'teal', verticalAlign: 'middle' }} size="large" gap={10} /> {text}
        </Flex>
      ),
      ...CreateStandardFilter(filterFields.userName, 'user_name'),
    },
    {
      title: 'Email',
      dataIndex: 'user_email',
      key: 'user_email',
      ...CreateStandardFilter(filterFields.userEmail, 'user_email'),
    },
    {
      title: 'Branch',
      dataIndex: 'user_branch',
      key: 'user_branch',
      ...CreateStandardFilter(filterFields.userEmail, 'user_branch'),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      ...CreateStandardFilter(filterFields.userRole, 'role'),
    },
    {
      title: 'Created Date',
      dataIndex: 'created_date',
      key: 'created_date',
      width: 120,
    },
    // {
    //   title: <Flex justify="center">Active</Flex>,
    //   dataIndex: 'verified',
    //   key: 'verified',
    //   width: 120,
    //   render: (bool: string, row: any) => <Flex justify="center">{row.active ? <MdOutlineCheck size={20} className="text-green-700" /> : <MdClose size={20} className="text-red-700" />}</Flex>,
    // },
    {
      title: <Flex justify="center">Status</Flex>,
      dataIndex: 'verified',
      key: 'verified',
      width: 100,
      ...CreateStandardFilter(filterFields.userRole, 'role'),
      render: (bool: string, row: any) => (
        <Flex>
          <Switch size="small" checked={row.active} onChange={(checked: boolean) => dispatch(updateTeamAction({ ...row, active: checked }))} />
        </Flex>
      ),
    },
    {
      title: <Flex justify="center">Action</Flex>,
      dataIndex: 'id',
      key: 'id',
      width: 120,
      render: (text: string, row: any) => (
        <Flex align="center" justify="center" gap={10}>
          <FaEye size={20} color="gray" className="cursor-pointer" onClick={() => onDetailsHandler()} />
          <TbEdit size={20} color="green" className="cursor-pointer" onClick={(e: any) => onEditHandler(e, row)} />
          <Popconfirm title="Delete" description="Are you sure to delete this record?" okText="Yes" cancelText="No">
            <TbTrash size={20} color="#c00" className="cursor-pointer" />
          </Popconfirm>
          {/* <Dropdown menu={{ items: rowItems, onClick: onItemClickHandler }} placement="bottomRight" trigger={['hover']} overlayStyle={{ width: 200 }}>
            <BiDotsVerticalRounded size={20} />
          </Dropdown> */}
        </Flex>
      ),
    },
  ];

  const descItems: DescriptionsProps['items'] = [
    {
      label: <span className="font-extrabold">Created At:</span>,
      children: '12/05/2025',
      span: 'filled',
      labelStyle: { width: 150 },
    },
    {
      label: <span className="font-extrabold">Updated At:|</span>,
      children: '10/10/2025',
      span: 'filled',
    },
  ];

  const onSave = useCallback(async () => {
    const val = await teamForm.getFieldsValue();
    dispatch(addTeamAction({ ...val, id: uuidv4(), verified: true, active: true, created_date: new Date().toLocaleDateString('en-GB') }));
    teamForm.resetFields();
    setIsCollapsed(false);
  }, [dispatch, teamForm]);

  const onDrawerClose = useCallback(() => {
    setIsCollapsed(false);
  }, []);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log('Change:', e.target.value);
  }, []);

  return (
    <>
      <Card
        title={
          <SearchComponent
            searchLabel="User List"
            onSearch={(value: string) => {
              console.log('===========', value);
            }}
          />
        }
        extra={
          <Space>
            <RangePicker suffixIcon={<BsCalendarDate size={20} />} />
            <Button onClick={onDrawerOpen}>Add</Button>
            {/* <IconLoader showLoader={true} /> */}
          </Space>
        }>
        <TableComponent rowKey={'id'} columns={teamCol} dataSource={teamList} bordered />
      </Card>

      <Drawer
        size={520}
        title={
          <Flex justify="space-between">
            <span>Create User</span>
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
                Send
              </Button>
            </Space>
          </Flex>
        }>
        <div className="flex flex-col gap-3">
          <Card title="User Details">
            <Form form={teamForm} layout="vertical">
              <Form.Item name="country_name" hidden>
                <Input hidden />
              </Form.Item>
              <Form.Item name="country_name" hidden>
                <Input hidden />
              </Form.Item>
              <Form.Item name="role" hidden>
                <Input hidden />
              </Form.Item>
              <Form.Item name="user_branch" hidden>
                <Input hidden />
              </Form.Item>

              <Form.Item name="user_name" label="User Name">
                <Input />
              </Form.Item>
              <Form.Item name="user_email" label="User Email Id">
                <Input />
              </Form.Item>
              {/* <Form.Item name="user_branch" label="User Branch">
              <Input />
            </Form.Item> */}
              <SelectWithAdd
                loadingState={false}
                dropDownList={branchList}
                formItemLabel="User Branch"
                field_id="user_branch_code"
                buttonLabel="Add Branch"
                onAddHandler={(val) => {
                  // setRoleList((prev) => prev.concat({ field_name: val, field_id: val.toUpperCase() }));
                }}
              />
              {/* <Form.Item name="user_role" label="User Role">
              <Input />
            </Form.Item> */}
              <SelectWithAdd
                loadingState={false}
                dropDownList={roleList}
                formItemLabel="User Role"
                field_id="user_role"
                buttonLabel="Add Role"
                onAddHandler={(val) => {
                  setRoleList((prev) => prev.concat({ field_name: val, field_id: val.toUpperCase() }));
                }}
              />
              <Form.Item name="user_description" label="Description">
                <TextArea rows={5} cols={4} showCount maxLength={500} onChange={onChange} />
              </Form.Item>
              {/* <SelectWithAdd
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
            /> */}
            </Form>
          </Card>
        </div>
      </Drawer>

      {/* Description View  */}
      <Drawer
        size={520}
        title={
          <Flex justify="space-between">
            <span>User Details</span>
            <RiCloseLine
              size={20}
              onClick={() => {
                setIsDetailsView(false);
              }}
              className="cursor-pointer"
            />
          </Flex>
        }
        open={isDetailsView}
        closable={false}
        maskClosable={false}
        footer={
          <Flex justify="end">
            <Space>
              <Button
                onClick={() => {
                  setIsDetailsView(false);
                }}>
                Cancel
              </Button>
            </Space>
          </Flex>
        }>
        <Space orientation="vertical" size="large">
          <Descriptions bordered items={descItems} />
          <Descriptions bordered items={descItems} />
          <Descriptions bordered items={descItems} />
          <Descriptions bordered items={descItems} />
        </Space>
      </Drawer>
    </>
  );
});
