'use client';

import IconLoader from '@src/components/IconLoader/IconLoader';
import SearchComponent from '@src/components/SearchComponent/SearchComponent';
import SelectWithAdd from '@src/components/SelectWithAdd/SelectWithAdd';
import { Button, Card, DatePicker, Divider, Drawer, Flex, Form, Input, Select, Space } from 'antd';
import React, { memo, useCallback, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { BsCalendarDate } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa';
import { RiCloseLine } from 'react-icons/ri';
import PermissionForm from './PermissionForm';
import PermissionTable from './PermissionTable';

const { RangePicker } = DatePicker;

export default memo(function PermissionWrapper() {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showTable, setShowTable] = useState<boolean>(false);

  const [permissonFormInstance] = Form.useForm();

  const onDrawerClose = useCallback(() => {
    setIsCollapsed(false);
  }, []);

  const onCreatePermission = async () => {
    try {
      setIsCollapsed(false);
      const values = await permissonFormInstance.getFieldsValue();
      console.log('======== ', values);
    } catch (error) {
      console.log('eee ', error);
    }
  };

  const onRoleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('======== ', e);
    setShowTable(true);
  };

  return (
    <>
      <Card
        title={
          <div className="flex items-center gap-3">
            <span>Role Permission</span>
            <Select
              style={{ width: 300 }}
              placeholder="Select Role"
              options={[
                { value: 1, label: 'Admin' },
                { value: 2, label: 'User' },
                { value: 3, label: 'Manager' },
                { value: 4, label: 'Head' },
              ]}
              onChange={onRoleSelect}
              popupRender={(menu) => (
                <>
                  {menu}
                  <Divider style={{ margin: '8px 0' }} />
                  <div className="p-3 align-middle justify-between flex gap-2">
                    <Space>
                      <Input placeholder="Enter Role" />
                      <Button icon={<FaPlus />}>Add</Button>
                    </Space>
                  </div>
                </>
              )}
            />
            {/* <SelectWithAdd
              dropDownList={[
                { value: 1, label: 'Admin' },
                { value: 2, label: 'User' },
                { value: 3, label: 'Manager' },
                { value: 4, label: 'Head' },
              ].map((el) => ({ field_name: el.label, field_id: el.value }))}
              loadingState={true}
              field_id="parent_branch_code"
              formItemLabel=" "
              buttonLabel="Add"
              onAddHandler={() => {
                console;
              }}
              onItemSelectHandler={() => {
                console.log('====');
              }}
            /> */}
            <SearchComponent searchLabel=" " onSearch={(val: string) => console.log('==== ', val)} />
          </div>
        }
        extra={
          <Space>
            {/* <RangePicker suffixIcon={<BsCalendarDate size={20} />} /> */}
            {/* <Button type="primary" onClick={onDrawerOpen}>
              Add Permission
            </Button> */}
            {/* <IconLoader showLoader={true} /> */}
          </Space>
        }>
        {<PermissionTable />}
      </Card>

      <Drawer
        width={520}
        title={
          <Flex justify="space-between">
            <span>Add User Permission</span>
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
              <Button type="primary" onClick={onCreatePermission} disabled={isLoading} icon={isLoading ? <IconLoader showLoader={isLoading} iconSize={20} /> : null}>
                Save
              </Button>
            </Space>
          </Flex>
        }>
        <Form form={permissonFormInstance} layout="vertical">
          <PermissionForm />
        </Form>
      </Drawer>
    </>
  );
});
