"use client";

import { addDrawer, drawerUpdate } from "@src/store/drawer";
import { selectIsCollapsedById } from "@src/store/drawer/memoised_drawer_selector";
import { useAppDispatch, useAppSelector } from "@src/store/redux_hooks";
import { AppState } from "@src/store/store_config";
import { Button, Card, Col, Descriptions, Drawer, Flex, Form, Image, Row, Space } from "antd";
import React, { memo, useCallback, useEffect } from "react";
import { RiCloseLine } from "react-icons/ri";
import CompanyForm from "./CompanyForm";
import UploadLogo from "./UploadLogo";

export default memo(function CompanyInfoWrapper() {
  const dispatch = useAppDispatch();
  const [profileFormParent] = Form.useForm();
  const _id = Form.useWatch("id", profileFormParent);
  const isCollapsed = useAppSelector((state: AppState) => selectIsCollapsedById(state, "add_profile_drawer"));

  useEffect(() => {
    dispatch(addDrawer({ drawerId: "add_profile_drawer", isCollapsed: false }));
  }, [dispatch]);

  const onOpenDrawer = useCallback(() => {
    dispatch(
      drawerUpdate({
        drawerId: "add_profile_drawer",
        isCollapsed: true,
      }),
    );
  }, [dispatch]);

  const onDrawerClose = useCallback(() => {
    dispatch(
      drawerUpdate({
        drawerId: "add_profile_drawer",
        isCollapsed: false,
      }),
    );
    profileFormParent.resetFields();
  }, [dispatch, profileFormParent.resetFields]);

  const onSaveHandler = useCallback(async () => {
    try {
      const val = await profileFormParent.validateFields();
      console.log("========= ", val);
    } catch (error) {
      console.log("ERR", error);
    } finally {
      onDrawerClose();
    }
  }, [profileFormParent, onDrawerClose]);

  return (
    <>
      <Card
        title="Company Information"
        extra={
          <Button type="primary" onClick={onOpenDrawer}>
            Add/Edit
          </Button>
        }
      >
        <Row gutter={[16, 16]} align={"stretch"}>
          <Col span={4}>
            <Image.PreviewGroup items={["https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"]}>
              <Image width={200} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
            </Image.PreviewGroup>
          </Col>
          <Col span={20}>
            <Descriptions
              layout="horizontal"
              items={[
                {
                  key: "company_name",
                  label: <strong>Company Name</strong>,
                  children: "Agrawal Movers and Packers",
                },
                {
                  key: "owner_name",
                  label: <strong>Owner Name</strong>,
                  children: "Ratan Agrawal (Bade Bhaiya)",
                },
                {
                  key: "email",
                  label: <strong>Email</strong>,
                  children: "badebhaiya.agrawal@gmail.com",
                  span: 2,
                },
                {
                  key: "gst_number",
                  label: <strong>Owner Name</strong>,
                  children: "GSTIN9568A2365S",
                },
                {
                  key: "address",
                  label: <strong>Address</strong>,
                  children: "Ambe Colony, Sector - 20, Reliance Energy Delhi - 110045",
                  span: 3,
                },
                {
                  key: "description",
                  label: <strong>Description</strong>,
                  children:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
                },
              ]}
            />
          </Col>
        </Row>
      </Card>

      <Drawer
        title={
          <Flex justify="space-between">
            <span>Company Information</span>
            <RiCloseLine size={20} onClick={onDrawerClose} className="cursor-pointer" />
          </Flex>
        }
        width={"25%"}
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
        }
      >
        <Form form={profileFormParent} layout="vertical">
          <UploadLogo />
          <CompanyForm />
        </Form>
      </Drawer>
    </>
  );
});
