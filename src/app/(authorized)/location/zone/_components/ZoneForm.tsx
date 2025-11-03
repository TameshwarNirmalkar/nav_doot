'use client';

import { useAppDispatch, useAppSelector } from '@src/store/redux_hooks';
import { selectZoneList } from '@src/store/zone';
import { addZoneAction, getZoneListAction } from '@src/store/zone/action';
import { App, Button, Drawer, Flex, Form, Input, Popover, Select, Space } from 'antd';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { HiPlusCircle } from 'react-icons/hi';
import { RiCloseLine } from 'react-icons/ri';

export default memo(function ZoneForm() {
  const zoneFormInstance = Form.useFormInstance();
  const allZones = useAppSelector(selectZoneList);
  const dispatch = useAppDispatch();

  const [zone_name, setZoneName] = useState<string>('');
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const { message } = App.useApp();

  useEffect(() => {
    dispatch(getZoneListAction());
  }, []);

  const onSave = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    if (!zone_name) {
      message.error('Field should not be empty');
    } else {
      dispatch(
        addZoneAction({
          zone_name: zone_name
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' '),
          zone_id: allZones.length + 1,
        }),
      );
      setZoneName('');
      onDrawerClose();
    }
  };

  const onDrawerOpen = () => {
    setIsCollapsed(true);
  };
  const onDrawerClose = () => {
    setIsCollapsed(false);
  };

  const onAddZoneHandler = useCallback(() => {
    onDrawerOpen();
  }, []);

  return (
    <Form name="zoneFormInstance" form={zoneFormInstance}>
      <Form.Item name="zone_name" hidden>
        <Input hidden />
      </Form.Item>
      <Form.Item
        layout="vertical"
        label={
          <Space>
            <span>Zone</span>
            <Flex justify="end">
              <div className="px-1 cursor-pointer">
                <HiPlusCircle color="darkorange" size={20} onClick={onAddZoneHandler} />
              </div>
            </Flex>
          </Space>
        }
        name="zone_id"
        rules={[{ required: true, message: 'Required' }]}
      >
        <Select
          placeholder="Select Zone/Region"
          optionFilterProp="label"
          filterSort={(optionA, optionB) => (optionA?.zone_name ?? '').toLowerCase().localeCompare((optionB?.zone_name ?? '').toLowerCase())}
          fieldNames={{ label: 'zone_name', value: 'zone_id' }}
          options={allZones}
        />
      </Form.Item>

      <Drawer
        title={
          <Flex justify="space-between">
            {/* <span>{id ? 'Edit Location' : 'Add Location'}</span> */}
            <span>Add Location</span>
            <RiCloseLine size={20} onClick={onDrawerClose} />
          </Flex>
        }
        open={isCollapsed}
        closable={false}
        maskClosable={false}
        footer={
          <Flex justify="end">
            <Space>
              <Button onClick={onDrawerClose}>Cancel</Button>
              <Button type="primary" onClick={onSave}>
                Save
              </Button>
            </Space>
          </Flex>
        }
      >
        <div>
          {/* onChange={(e) => setZoneName(e.target.value)} */}
          <Input name="zone_name" onChange={(e) => setZoneName(e.target.value)} />
        </div>
      </Drawer>
    </Form>
  );
});
