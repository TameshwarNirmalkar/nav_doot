"use client";

import { addDrawer, drawerUpdate } from "@src/store/drawer";
import { selectIsCollapsedById } from "@src/store/drawer/memoised_drawer_selector";
import { useAppDispatch, useAppSelector } from "@src/store/redux_hooks";
import { AppState } from "@src/store/store_config";
import { Button, Card, Drawer, Flex, Form, Popconfirm, Space, Spin, Table } from "antd";
import React, { memo, useCallback, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { BiEdit } from "react-icons/bi";
import { RiCloseLine } from "react-icons/ri";
import { TbTrash } from "react-icons/tb";
import AddCustomerForm from "./AddCustomerForm";
import { getCustomersAction } from "@src/store/customers/action";
import { addCustomer, removeCustomer, selectCustomerList, updadateCustomer } from "@src/store/customers";
import { customerIsLoading } from "@src/store/customers/memonised_customer_selector";
import { getbranchTypeListAction } from "@src/store/branch_type/action";
import TableComponent from "@src/components/Tables/TableComponent";

const CustomerWrapper = () => {
  const columns = [
    {
      title: "Customer Name",
      dataIndex: "customer_name",
      key: "customer_name",
    },
    // {
    //   title: 'Branch Type',
    //   dataIndex: 'branch_type',
    //   key: 'branch_type',
    // },
    {
      title: "Parent Branch",
      dataIndex: "parent_branch_name",
      key: "parent_branch_name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Pan Number",
      dataIndex: "pan_number",
      key: "pan_number",
    },
    {
      title: "Contact Person",
      dataIndex: "contact_person",
      key: "contact_person",
    },
    {
      title: "Created Date",
      dataIndex: "created_date",
      key: "created_date",
    },
    {
      title: "Modified Date",
      dataIndex: "updated_date",
      key: "updated_date",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (text: string, row: any) => (
        <Space>
          <BiEdit size={20} color="green" className="cursor-pointer" onClick={() => onCustomerEdit(row)} />

          <Popconfirm title="Delete" description="Are you sure to delete this record?" okText="Yes" cancelText="No" onConfirm={() => onRemoveCustomer(row)}>
            <TbTrash size={20} color="#c00" className="cursor-pointer" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const dispatch = useAppDispatch();
  const [customerForm] = Form.useForm();
  const id = Form.useWatch("id", customerForm);
  const isCollapsed = useAppSelector((state: AppState) => selectIsCollapsedById(state, "add_customers_drawer"));
  const customerList = useAppSelector(selectCustomerList);
  const isLoading = useAppSelector(customerIsLoading);

  useEffect(() => {
    dispatch(addDrawer({ drawerId: "add_customers_drawer", isCollapsed: false }));
    dispatch(getCustomersAction());
    dispatch(getbranchTypeListAction());
  }, [dispatch]);

  const onOpenDrawer = useCallback(() => {
    dispatch(
      drawerUpdate({
        drawerId: "add_customers_drawer",
        isCollapsed: true,
      }),
    );
  }, [dispatch]);

  const onDrawerClose = useCallback(() => {
    dispatch(
      drawerUpdate({
        drawerId: "add_customers_drawer",
        isCollapsed: false,
      }),
    );
    customerForm.resetFields();
  }, [dispatch]);

  const onCustomerSave = useCallback(async () => {
    try {
      const val = await customerForm.validateFields();
      if (val.id) {
        dispatch(
          updadateCustomer({
            id: val.id,
            changes: {
              ...val,
              updated_date: new Date().toLocaleDateString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                // optional: for a 24-hour clock (common in 'en-GB' and technical contexts)
                hour12: false,
              }),
            },
          }),
        );
      } else {
        dispatch(
          addCustomer({
            ...val,
            id: uuidv4(),
            created_date: new Date().toLocaleDateString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
            }),
            updated_date: new Date().toLocaleDateString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
            }),
          }),
        );
      }
    } catch (error) {
      console.log("error ====== ", error);
    } finally {
      onDrawerClose();
    }
  }, []);

  const onCustomerEdit = useCallback((el: any) => {
    customerForm.setFieldsValue(el);
    onOpenDrawer();
  }, []);

  const onRemoveCustomer = useCallback((el: any) => {
    dispatch(removeCustomer(el.id));
  }, []);

  return (
    <>
      <Card
        title="Customer Gateway"
        extra={
          <>
            <Spin spinning={isLoading} />
            <Button type="primary" onClick={onOpenDrawer}>
              Add
            </Button>
          </>
        }
      >
        <TableComponent rowKey={"id"} columns={columns} dataSource={customerList} />
      </Card>

      <Drawer
        title={
          <Flex justify="space-between">
            <span>{id ? "Edit" : "Add"} Customer</span>
            <RiCloseLine size={20} onClick={onDrawerClose} className="cursor-pointer" />
          </Flex>
        }
        width={"60%"}
        open={isCollapsed}
        closable={false}
        maskClosable={false}
        footer={
          <Flex justify="end">
            <Space>
              <Button onClick={onDrawerClose}>Cancel</Button>
              <Button type="primary" htmlType="submit" onClick={onCustomerSave}>
                Save
              </Button>
            </Space>
          </Flex>
        }
      >
        <Form form={customerForm} layout="vertical">
          <AddCustomerForm />
        </Form>
      </Drawer>
    </>
  );
};

export default memo(CustomerWrapper);
