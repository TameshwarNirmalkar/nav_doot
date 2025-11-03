"use client";

import { addDrawer, drawerUpdate } from "@src/store/drawer";
import { selectIsCollapsedById } from "@src/store/drawer/memoised_drawer_selector";
import { useAppDispatch, useAppSelector } from "@src/store/redux_hooks";
import { AppState } from "@src/store/store_config";
import { Button, Card, Drawer, Flex, Form, Popconfirm, Space, Spin } from "antd";
import React, { memo, useCallback, useEffect, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { BiEdit } from "react-icons/bi";
import { RiCloseLine } from "react-icons/ri";
import { TbTrash } from "react-icons/tb";
import AddVendorForm from "./AddVendorForm";
import { getbranchTypeListAction } from "@src/store/branch_type/action";
import { addVendorAction, getVendorAction, updateVendorAction } from "@src/store/vendors/action";
import { removeVendors, selectVendorList } from "@src/store/vendors";
import { vendorIsLoading } from "@src/store/vendors/memonised_vendors_selector";
import IconLoader from "@src/components/IconLoader/IconLoader";
import TableComponent from "@src/components/Tables/TableComponent";
import { getUniqueFilters } from "@src/utility/common_function";

const CustomerWrapper = () => {
  const dispatch = useAppDispatch();
  const [vendorForm] = Form.useForm();
  const id = Form.useWatch("id", vendorForm);
  const isCollapsed = useAppSelector((state: AppState) => selectIsCollapsedById(state, "add_vendors_drawer"));
  const vendorList = useAppSelector(selectVendorList);
  const isLoading = useAppSelector(vendorIsLoading);

  useEffect(() => {
    dispatch(addDrawer({ drawerId: "add_vendors_drawer", isCollapsed: false }));
    dispatch(getVendorAction());
    dispatch(getbranchTypeListAction());
  }, [dispatch]);

  const filterFields = useMemo(() => {
    return {
      vendorName: getUniqueFilters(vendorList, "vendor_name"),
      parentBranch: getUniqueFilters(vendorList, "parent_branch_name"),
      contactPerson: getUniqueFilters(vendorList, "contact_person"),
      panNumber: getUniqueFilters(vendorList, "pan_number"),
    };
  }, [vendorList]);

  const columns: any = [
    {
      title: "Vendor Name",
      dataIndex: "vendor_name",
      key: "vendor_name",
      filters: filterFields.vendorName,
      onFilter: (value: string | number | boolean, record: any) => {
        return record.vendor_name.toLowerCase() === value;
      },
      filterMultiple: true,
    },
    {
      title: "Parent Branch",
      dataIndex: "parent_branch_name",
      key: "parent_branch_name",
      filters: filterFields.parentBranch,
      onFilter: (value: string | number | boolean, record: any) => {
        return record.parent_branch_name.toLowerCase() === value;
      },
      filterMultiple: true,
    },
    {
      title: "Contact Person",
      dataIndex: "contact_person",
      key: "contact_person",
      filters: filterFields.contactPerson,
      onFilter: (value: string | number | boolean, record: any) => {
        return record.contact_person.toLowerCase() === value;
      },
    },
    {
      title: "Pan Number",
      dataIndex: "pan_number",
      key: "pan_number",
      filters: filterFields.panNumber,
      onFilter: (value: string | number | boolean, record: any) => {
        return record.pan_number === value;
      },
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
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
          <BiEdit size={20} color="green" className="cursor-pointer" onClick={() => onVendorEdit(row)} />

          <Popconfirm title="Delete" description="Are you sure to delete this record?" okText="Yes" cancelText="No" onConfirm={() => onRemoveVendor(row)}>
            <TbTrash size={20} color="#c00" className="cursor-pointer" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const onOpenDrawer = useCallback(() => {
    dispatch(
      drawerUpdate({
        drawerId: "add_vendors_drawer",
        isCollapsed: true,
      }),
    );
  }, [dispatch]);

  const onDrawerClose = useCallback(() => {
    dispatch(
      drawerUpdate({
        drawerId: "add_vendors_drawer",
        isCollapsed: false,
      }),
    );
    vendorForm.resetFields();
  }, [dispatch]);

  const onVendorSave = useCallback(async () => {
    try {
      const val = await vendorForm.validateFields();
      if (val.id) {
        await dispatch(
          updateVendorAction({
            ...val,
            updated_date: new Date().toLocaleDateString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
            }),
          }),
        );
      } else {
        await dispatch(
          addVendorAction({
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

  const onVendorEdit = useCallback((el: any) => {
    vendorForm.setFieldsValue(el);
    onOpenDrawer();
  }, []);

  const onRemoveVendor = useCallback((el: any) => {
    dispatch(removeVendors(el.id));
  }, []);

  return (
    <>
      <Card
        title="Vendor Gateway"
        extra={
          <>
            <Spin spinning={isLoading} />
            <Button type="primary" onClick={onOpenDrawer}>
              Add
            </Button>
          </>
        }
      >
        <TableComponent rowKey={"id"} columns={columns} dataSource={vendorList} />
      </Card>

      <Drawer
        title={
          <Flex justify="space-between">
            <span>{id ? "Edit" : "Add"} Vendor</span>
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
              <Button type="primary" htmlType="submit" onClick={onVendorSave} disabled={isLoading} icon={isLoading ? <IconLoader showLoader={isLoading} iconSize={20} /> : null}>
                Save
              </Button>
            </Space>
          </Flex>
        }
      >
        <Form form={vendorForm} layout="vertical">
          <AddVendorForm />
        </Form>
      </Drawer>
    </>
  );
};

export default memo(CustomerWrapper);
