'use client';

import CollapsibleComponent from '@src/components/Collapsible/CollapsibleComponent';
import { addDrawer, drawerUpdate } from '@src/store/drawer';
import { selectIsCollapsedById } from '@src/store/drawer/memoised_drawer_selector';
import { useAppDispatch, useAppSelector } from '@src/store/redux_hooks';
import { AppState } from '@src/store/store_config';
import { Button, Card, Col, Collapse, CollapseProps, Descriptions, DescriptionsProps, Drawer, Flex, Form, Image, Row, Space } from 'antd';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import CompanyForm from './CompanyForm';
import UploadLogo from './UploadLogo';

export default memo(function CompanyInfoWrapper() {
  const dispatch = useAppDispatch();
  const [profileFormParent] = Form.useForm();
  const _id = Form.useWatch('id', profileFormParent);
  const isCollapsed = useAppSelector((state: AppState) => selectIsCollapsedById(state, 'add_profile_drawer'));
  const [activeKeys, setActiveKeys] = useState<string[]>(['1']);

  useEffect(() => {
    dispatch(addDrawer({ drawerId: 'add_profile_drawer', isCollapsed: false }));
  }, [dispatch]);

  const onOpenDrawer = useCallback(() => {
    dispatch(
      drawerUpdate({
        drawerId: 'add_profile_drawer',
        isCollapsed: true,
      }),
    );
  }, [dispatch]);

  const onDrawerClose = useCallback(() => {
    dispatch(
      drawerUpdate({
        drawerId: 'add_profile_drawer',
        isCollapsed: false,
      }),
    );
    profileFormParent.resetFields();
  }, [dispatch, profileFormParent.resetFields]);

  const onSaveHandler = useCallback(async () => {
    try {
      const val = await profileFormParent.validateFields();
      console.log('========= ', val);
    } catch (error) {
      console.log('ERR', error);
    } finally {
      onDrawerClose();
    }
  }, [profileFormParent, onDrawerClose]);

  const narrowLabelStyle = { width: '250px' };

  const companyInformation: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Reg. Company Name',
      children: 'AirFlight',
      span: 'filled',
      labelStyle: narrowLabelStyle,
    },
    {
      key: '2',
      label: 'Company ID',
      children: '1242533FDS252',
      span: 'filled',
    },
    {
      key: '3',
      label: 'Company Logo',
      children: <Image src="https://dummyimage.com/100x100/C00/fff.png&text=AirLift" className="rounded border border-amber-700" />,
      span: 'filled',
    },
  ];

  const kycInfo: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Email',
      children: 'mycompany@company.com',
      span: 'filled',
      labelStyle: narrowLabelStyle,
    },
    {
      key: '2',
      label: 'Phone',
      children: '2513625425',
      span: 'filled',
    },
    {
      key: '3',
      label: 'Website',
      children: 'https://www.mycompany.com',
      span: 'filled',
    },
    {
      key: '4',
      label: 'GST No.',
      children: '251DFF2515135DD',
      span: 'filled',
    },
    {
      key: '5',
      label: 'PAN No.',
      children: '251DFF2515135DD',
      span: 'filled',
    },
    {
      key: '5',
      label: 'Address',
      children: 'Shop no. 25, Dwarkapur Section-40, 110005',
      span: 'filled',
    },
    {
      key: '6',
      label: 'About Company',
      children: 'Some description about the company',
      span: 'filled',
    },
  ];

  const paymentInfo: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Bank Account',
      children: '2514**********23',
      span: 'filled',
      labelStyle: narrowLabelStyle,
    },
    {
      key: '2',
      label: 'Credit Details',
      children: '25 credit points available',
      span: 'filled',
    },
  ];

  const invoicingInfo: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Invoice Prefix',
      children: '2514**********23',
      span: 'filled',
      labelStyle: narrowLabelStyle,
    },
    {
      key: '2',
      label: 'Invoice series starts from',
      children: '1001',
      span: 'filled',
    },
    {
      key: '3',
      label: 'CIN Number',
      children: '1001DFS2523SA8',
      span: 'filled',
    },
    {
      key: '4',
      label: 'Upload Signature',
      children: <Image src="https://dummyimage.com/100x100/d1edff/0014cc.png&text=Signature" className="rounded border border-blue-500" />,
      span: 'filled',
    },
  ];

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Company Information',
      children: (
        <>
          <Descriptions bordered={true} size={'small'} items={companyInformation} />
        </>
      ),
    },
    {
      key: '2',
      label: 'KYC Information',
      children: (
        <>
          <Descriptions bordered={true} size={'small'} items={kycInfo} />
        </>
      ),
    },
    {
      key: '3',
      label: 'Payment Information',
      children: (
        <>
          <Descriptions bordered={true} size={'small'} items={paymentInfo} />
        </>
      ),
    },
    {
      key: '4',
      label: 'Invoicing Information',
      children: (
        <>
          <Descriptions bordered={true} size={'small'} items={invoicingInfo} />
        </>
      ),
    },
  ];

  const onCollapseChange = useCallback((keys: string[]) => {
    setActiveKeys(keys);
  }, []);

  return (
    <>
      <Card
        title="Company Details"
        // extra={
        //   <Button type="primary" onClick={onOpenDrawer}>
        //     Add/Edit
        //   </Button>
        // }
      >
        <CollapsibleComponent items={items} activeKey={activeKeys} onChange={onCollapseChange} />
      </Card>

      <Drawer
        title={
          <Flex justify="space-between">
            <span>Company Information</span>
            <RiCloseLine size={20} onClick={onDrawerClose} className="cursor-pointer" />
          </Flex>
        }
        width={'25%'}
        open={isCollapsed}
        closable={false}
        maskClosable={false}
        footer={
          <Flex justify="end">
            <Space>
              <Button onClick={onDrawerClose}>Cancel</Button>
              <Button type="primary" htmlType="submit" onClick={onSaveHandler}>
                Save
              </Button>
            </Space>
          </Flex>
        }>
        <Form form={profileFormParent} layout="vertical">
          <UploadLogo />
          <CompanyForm />
        </Form>
      </Drawer>
    </>
  );
});
