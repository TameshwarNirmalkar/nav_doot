'use client';

import IconLoader from '@src/components/IconLoader/IconLoader';
import SearchComponent from '@src/components/SearchComponent/SearchComponent';
import { Button, Card, DatePicker, Drawer, Flex, Form, Input, Select, Space } from 'antd';
import React, { memo, useCallback, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { BsCalendarDate } from 'react-icons/bs';
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

  const onDrawerOpen = useCallback(() => {
    setIsCollapsed(true);
  }, []);

  const onCreatePermission = useCallback(async () => {
    try {
      setIsCollapsed(false);
      const values = await permissonFormInstance.getFieldsValue();
      console.log('======== ', values);
    } catch (error) {
      console.log('eee ', error);
    }
  }, [permissonFormInstance]);

  const onRoleSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('======== ', e);
    setShowTable(true);
  }, []);

  return (
    <>
      <Card
        title={
          <div className="flex items-center">
            <Select
              style={{ width: 200 }}
              options={[
                { value: 1, label: 'Admin' },
                { value: 2, label: 'User' },
                { value: 3, label: 'Manager' },
                { value: 4, label: 'Head' },
              ]}
              onChange={onRoleSelect}
            />
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
        {showTable && <PermissionTable />}
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
