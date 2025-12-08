'use client';

import IconLoader from '@src/components/IconLoader/IconLoader';
import SearchComponent from '@src/components/SearchComponent/SearchComponent';
import TableComponent from '@src/components/Tables/TableComponent';
import { Button, Card, DatePicker, Drawer, Flex, Form, Space } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { memo, useCallback, useState } from 'react';
import { BsCalendarDate } from 'react-icons/bs';
import { RiCloseLine } from 'react-icons/ri';
import BookingForm from './BookingForm';
import BookingSummaryDescription from './BookingSummaryDescription';

const { RangePicker } = DatePicker;

export default memo(function BookingWrapper() {
  const [bookingForm] = Form.useForm();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const bookingCols = [
    {
      title: 'S.N',
      dataIndex: 'sn',
      key: 'sn',
      width: 50,
      // ...CreateStandardFilter(filterFields.userName, 'user_name'),
    },
    {
      title: 'AWB (Waybill Number)',
      dataIndex: 'awb_bill',
      key: 'awb_bill',
      // ...CreateStandardFilter(filterFields.userName, 'user_name'),
    },
    {
      title: 'Pickup Postal Code',
      dataIndex: 'pickup_postal_code',
      key: 'pickup_postal_code',
      // ...CreateStandardFilter(filterFields.userName, 'user_name'),
    },
    {
      title: 'Pickup City',
      dataIndex: 'pickup_city',
      key: 'pickup_city',
      // ...CreateStandardFilter(filterFields.userName, 'user_name'),
    },
    {
      title: 'Delivery City',
      dataIndex: 'delivery_city',
      key: 'delivery_city',
      // ...CreateStandardFilter(filterFields.userName, 'user_name'),
    },
  ];

  const bookingList: any = [
    {
      sn: 1,
      awb_bill: 'AFDFS1554REDA',
      pickup_city: 'Delhi',
      pickup_postal_code: '411025',
      delivery_city: 'Mumbai',
    },
    {
      sn: 2,
      awb_bill: 'BFDFS1554REDB',
      pickup_city: 'Calcuatta',
      pickup_postal_code: '411001',
      delivery_city: 'Delhi',
    },
  ];

  const onDrawerOpen = useCallback(() => {
    setIsCollapsed(true);
  }, []);

  const onDrawerClose = useCallback(() => {
    setIsCollapsed(false);
  }, []);

  const onSave = useCallback(async () => {
    try {
      const val = await bookingForm.getFieldsValue();
      console.log('========', val);
      // bookingForm.resetFields();
      // setIsCollapsed(false);
    } catch (error) {
      console.log('error ======', error);
    }
  }, [bookingForm]);

  return (
    <div>
      <Card
        title={
          <SearchComponent
            searchLabel="Booking List"
            onSearch={(value: string) => {
              console.log('===========', value);
            }}
            placeholder="Search Booking"
          />
        }
        extra={
          <Space>
            {/* <RangePicker suffixIcon={<BsCalendarDate size={20} />} /> */}
            <Button onClick={onDrawerOpen}>Add Booking</Button>
            {/* <IconLoader showLoader={true} /> */}
          </Space>
        }>
        <TableComponent rowKey={'sn'} columns={bookingCols} dataSource={bookingList} bordered pagination={false} />
      </Card>

      <Drawer
        size={900}
        title={
          <Flex justify="space-between">
            <span>Add Booking</span>
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
        <div className="flex flex-row gap-5">
          <div className="flex-1">
            <Form name="bookingForm" form={bookingForm} layout="vertical">
              <BookingForm />
            </Form>
          </div>
          {/* <div className="flex-1">
            <BookingSummaryDescription />
          </div> */}
        </div>
      </Drawer>
    </div>
  );
});
