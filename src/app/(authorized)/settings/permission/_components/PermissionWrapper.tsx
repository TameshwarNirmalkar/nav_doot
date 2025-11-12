'use client';

import { Button, Card, DatePicker, Input, Space } from 'antd';
import React, { memo, useCallback, useState } from 'react';
import { BsCalendarDate } from 'react-icons/bs';
import PermissionTable from './PermissionTable';

const { RangePicker } = DatePicker;

const { Search } = Input;

export default memo(function PermissionWrapper() {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const onDrawerClose = useCallback(() => {
    setIsCollapsed(false);
  }, []);

  const onDrawerOpen = useCallback(() => {
    setIsCollapsed(true);
  }, []);

  return (
    <Card
      title={
        <Space>
          <div>Permission</div>
          <Search
            enterButton
            placeholder="Search User"
            style={{ width: 340 }}
            onSearch={(value, event) => {
              console.log('===========');
            }}
          />
        </Space>
      }
      extra={
        <Space>
          <RangePicker suffixIcon={<BsCalendarDate size={20} />} />
          <Button type="primary" onClick={onDrawerOpen}>
            Add Permission
          </Button>
          {/* <IconLoader showLoader={true} /> */}
        </Space>
      }>
      <PermissionTable />
    </Card>
  );
});
