'use client';

import CollapsibleComponent from '@src/components/Collapsible/CollapsibleComponent';
import { addDrawer, drawerUpdate } from '@src/store/drawer';
import { selectIsCollapsedById } from '@src/store/drawer/memoised_drawer_selector';
import { useAppDispatch, useAppSelector } from '@src/store/redux_hooks';
import { AppState } from '@src/store/store_config';
import { Button, Card, Col, Collapse, CollapseProps, Descriptions, DescriptionsProps, Drawer, Flex, Form, Image, Row, Space } from 'antd';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { FaCloudUploadAlt, FaEdit } from 'react-icons/fa';
import { FaChalkboardUser } from 'react-icons/fa6';
import { RiCloseLine } from 'react-icons/ri';
import { TbEdit } from 'react-icons/tb';
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
      label: <span className="font-extrabold">Reg. Company Name</span>,
      children: 'AirFlight',
      span: 'filled',
      labelStyle: narrowLabelStyle,
    },
    {
      key: '2',
      label: <span className="font-extrabold">Company ID</span>,
      children: '1242533FDS252',
      span: 'filled',
    },
    {
      key: '3',
      label: <span className="font-extrabold">Company Logo</span>,
      children: (
        <>
          <FaCloudUploadAlt size={50} /> {/* <Image src="https://img.freepik.com/premium-vector/creative-elegant-abstract-minimalistic-logo-design-vector-any-brand-company_1253202-136677.jpg?semt=ais_hybrid&w=740&q=80" className="rounded border border-amber-700" width={200} /> */}
        </>
      ),
      span: 'filled',
    },
  ];

  const kycInfo: DescriptionsProps['items'] = [
    {
      key: '1',
      label: <span className="font-extrabold">Email</span>,
      children: 'mycompany@company.com',
      span: 'filled',
      labelStyle: narrowLabelStyle,
    },
    {
      key: '2',
      label: <span className="font-extrabold">Phone</span>,
      children: '2513625425',
      span: 'filled',
    },
    {
      key: '3',
      label: <span className="font-extrabold">Website</span>,
      children: 'https://www.mycompany.com',
      span: 'filled',
    },
    {
      key: '4',
      label: <span className="font-extrabold">GST No.</span>,
      children: '251DFF2515135DD',
      span: 'filled',
    },
    {
      key: '5',
      label: <span className="font-extrabold">PAN No.</span>,
      children: '251DFF2515135DD',
      span: 'filled',
    },
    {
      key: '5',
      label: <span className="font-extrabold">Address</span>,
      children: 'Shop no. 25, Dwarkapur Section-40, 110005',
      span: 'filled',
    },
    {
      key: '6',
      label: <span className="font-extrabold">About Company</span>,
      children: 'Some description about the company',
      span: 'filled',
    },
  ];

  const paymentInfo: DescriptionsProps['items'] = [
    {
      key: '1',
      label: <span className="font-extrabold">Bank Account</span>,
      children: '2514**********23',
      span: 'filled',
      labelStyle: narrowLabelStyle,
    },
    {
      key: '2',
      label: <span className="font-extrabold">Credit Details</span>,
      children: '25 credit points available',
      span: 'filled',
    },
  ];

  const invoicingInfo: DescriptionsProps['items'] = [
    {
      key: '1',
      label: <span className="font-extrabold">Invoice Prefix</span>,
      children: '2514**********23',
      span: 'filled',
      labelStyle: narrowLabelStyle,
    },
    {
      key: '2',
      label: <span className="font-extrabold">Invoice series starts from</span>,
      children: '1001',
      span: 'filled',
    },
    {
      key: '3',
      label: <span className="font-extrabold">CIN Number</span>,
      children: '1001DFS2523SA8',
      span: 'filled',
    },
    {
      key: '4',
      label: <span className="font-extrabold">Upload Signature</span>,
      children: <Image src="https://dummyimage.com/100x100/d1edff/0014cc.png&text=Signature" className="rounded border border-blue-500" />,
      span: 'filled',
    },
  ];

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: (
        <Flex align="center">
          <span>Company Information</span>
          <TbEdit size={18} className="ml-2 cursor-pointer" color="green" onClick={onOpenDrawer} />
        </Flex>
      ),
      children: (
        <>
          <Descriptions bordered={true} size={'small'} items={companyInformation} />
        </>
      ),
    },
    {
      key: '2',
      label: (
        <Flex align="center">
          <span>KYC Information</span>
          <TbEdit size={18} className="ml-2 cursor-pointer" color="green" onClick={onOpenDrawer} />
        </Flex>
      ),
      children: (
        <>
          <Descriptions bordered={true} size={'small'} items={kycInfo} />
        </>
      ),
    },
    {
      key: '3',
      label: (
        <Flex align="center">
          <span>Payment Information</span>
          <TbEdit size={18} className="ml-2 cursor-pointer" color="green" onClick={onOpenDrawer} />
        </Flex>
      ),
      children: (
        <>
          <Descriptions bordered={true} size={'small'} items={paymentInfo} />
        </>
      ),
    },
    {
      key: '4',
      label: (
        <Flex align="center">
          <span>Invoicing Information</span>
          <TbEdit size={18} className="ml-2 cursor-pointer" color="green" onClick={onOpenDrawer} />
        </Flex>
      ),
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
            <RiCloseLine size={18} onClick={onDrawerClose} className="cursor-pointer" />
          </Flex>
        }
        size={'large'}
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
