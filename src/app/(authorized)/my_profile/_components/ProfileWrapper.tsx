'use client';

import { addDrawer, drawerUpdate } from '@src/store/drawer';
import { selectIsCollapsedById } from '@src/store/drawer/memoised_drawer_selector';
import { useAppDispatch, useAppSelector } from '@src/store/redux_hooks';
import { AppState } from '@src/store/store_config';
import { Button, Card, Col, Descriptions, Drawer, Flex, Form, Image, Row, Space } from 'antd';
import React, { memo, useCallback, useEffect } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import ProfileForm from './ProfileForm';
import UploadProfile from './UploadProfile';

export default memo(function ProfileWrapper() {
  const dispatch = useAppDispatch();
  const [profileFormParent] = Form.useForm();
  const id = Form.useWatch('id', profileFormParent);
  const isCollapsed = useAppSelector((state: AppState) => selectIsCollapsedById(state, 'add_profile_drawer'));

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

  return (
    <>
      <Card
        title="My Information"
        extra={
          <Button type="primary" onClick={onOpenDrawer}>
            Add/Edit
          </Button>
        }>
        <Row gutter={[16, 16]} align={'stretch'}>
          <Col span={4}>
            {/* <UploadProfile /> */}
            <Image.PreviewGroup
              items={['https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp', 'https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp', 'https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp']}>
              <Image width={200} src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp" />
            </Image.PreviewGroup>
          </Col>
          <Col span={20}>
            {/* <ProfileForm /> */}
            <Descriptions
              // title="User Info"
              layout="horizontal"
              items={[
                {
                  key: 'full_name',
                  label: <strong>Full Name</strong>,
                  children: 'Scarlet Johnson',
                },
                {
                  key: 'email',
                  label: <strong>Email</strong>,
                  children: 'scarlet.johnson@gmail.com',
                  span: 2,
                },
                {
                  key: 'description',
                  label: <strong>Description</strong>,
                  span: 1,
                  children:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
                },
              ]}
            />
          </Col>
        </Row>
      </Card>

      <Drawer
        title={
          <Flex justify="space-between">
            <span>{id ? 'Edit' : 'Add'} Profile</span>
            <RiCloseLine size={20} onClick={onDrawerClose} className="cursor-pointer" />
          </Flex>
        }
        width={'40%'}
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
          <UploadProfile />
          <ProfileForm />
        </Form>
      </Drawer>
    </>
  );
});
