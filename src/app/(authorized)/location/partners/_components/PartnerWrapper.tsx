'use client';

import DropdownWithCheckboxes from '@src/components/FilterColumnComponent/FilterComponents';
import SearchComponent from '@src/components/SearchComponent/SearchComponent';
import TableComponent from '@src/components/Tables/TableComponent';
import { getbranchTypeListAction } from '@src/store/branch_type/action';
import { getAllCountriesWithFlagAction } from '@src/store/country_cities/action';
import { addCustomer, removeCustomer, selectCustomerList, updadateCustomer } from '@src/store/customers';
import { getCustomersAction } from '@src/store/customers/action';
import { customerIsLoading } from '@src/store/customers/memonised_customer_selector';
import { addDrawer, drawerUpdate } from '@src/store/drawer';
import { selectIsCollapsedById } from '@src/store/drawer/memoised_drawer_selector';
import { useAppDispatch, useAppSelector } from '@src/store/redux_hooks';
import { AppState } from '@src/store/store_config';
import { getUniqueFilters } from '@src/utility/common_function';
import { Button, Card, Drawer, Flex, Form, Popconfirm, Space, Spin, Switch, Table } from 'antd';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { FaEye } from 'react-icons/fa';
import { RiCloseLine, RiFilter3Fill } from 'react-icons/ri';
import { TbTrash } from 'react-icons/tb';
import { v4 as uuidv4 } from 'uuid';
import AddCustomerForm from './AddPartnerForm';

const PartnerWrapper = () => {
  const dispatch = useAppDispatch();
  const [pertnerForm] = Form.useForm();
  const id = Form.useWatch('id', pertnerForm);
  const isCollapsed = useAppSelector((state: AppState) => selectIsCollapsedById(state, 'add_customers_drawer'));
  const customerList = useAppSelector(selectCustomerList);
  const _isLoading = useAppSelector(customerIsLoading);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

  const filterFields = useMemo(() => {
    return {
      customerName: getUniqueFilters(customerList, 'customer_name'),
      parentBranchName: getUniqueFilters(customerList, 'parent_branch_name'),
      contactPerson: getUniqueFilters(customerList, 'contact_person'),
      panNumber: getUniqueFilters(customerList, 'pan_number'),
      createdDate: getUniqueFilters(customerList, 'created_date'),
    };
  }, [customerList]);

  const columns: any[] = [
    {
      title: 'Name',
      dataIndex: 'customer_name',
      key: 'customer_name',
      filters: filterFields.customerName,
      filterIcon: <RiFilter3Fill size={20} />,
      onFilter: (value: string, record: any) => {
        return record.customer_name.toLowerCase() === value;
      },
      filterMultiple: true,
    },
    // {
    //   title: 'Branch Type',
    //   dataIndex: 'branch_type',
    //   key: 'branch_type',
    // },

    {
      title: 'Pan Number',
      dataIndex: 'pan_number',
      key: 'pan_number',
      filters: filterFields.contactPerson,
      filterIcon: <RiFilter3Fill size={20} />,
      onFilter: (value: string, record: any) => {
        return record.pan_number.toLowerCase() === value;
      },
      filterMultiple: true,
    },
    {
      title: 'Contact Person',
      dataIndex: 'contact_person',
      key: 'contact_person',
      filters: filterFields.contactPerson,
      filterIcon: <RiFilter3Fill size={20} />,
      onFilter: (value: string, record: any) => {
        return record.contact_person.toLowerCase() === value;
      },
      filterMultiple: true,
    },
    {
      title: 'Parent Branch',
      dataIndex: 'parent_branch_name',
      key: 'parent_branch_name',
      filters: filterFields.parentBranchName,
      filterIcon: <RiFilter3Fill size={20} />,
      onFilter: (value: string, record: any) => {
        return record.parent_branch_name.toLowerCase() === value;
      },
      filterMultiple: true,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    // {
    //   title: 'Created Date',
    //   dataIndex: 'created_date',
    //   key: 'created_date',
    // },
    // {
    //   title: 'Modified Date',
    //   dataIndex: 'updated_date',
    //   key: 'updated_date',
    // },
    {
      title: 'Status',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      filters: filterFields.parentBranchName,
      filterIcon: <RiFilter3Fill size={20} />,
      onFilter: (value: string, record: any) => {
        return record.country.toLowerCase() === value;
      },
      filterMultiple: true,
      render: (text: string, row: any) => (
        <Flex>
          <Switch size="small" loading={false} defaultChecked={false} />
        </Flex>
      ),
    },
    {
      title: <Flex justify="center">Action</Flex>,
      dataIndex: 'id',
      key: 'id',
      render: (text: string, row: any) => (
        <Flex gap={10} justify="center" align="center">
          <FaEye size={20} color="gray" className="cursor-pointer" />
          <BiEdit size={20} color="green" className="cursor-pointer" onClick={() => onCustomerEdit(row)} />

          <Popconfirm title="Delete" description="Are you sure to delete this record?" okText="Yes" cancelText="No" onConfirm={() => onRemoveCustomer(row)}>
            <TbTrash size={20} color="#c00" className="cursor-pointer" />
          </Popconfirm>
        </Flex>
      ),
    },
  ];

  const filteredColumns = useMemo(() => {
    if (!selectedColumns.length) {
      return columns;
    } else {
      return columns.filter((el) => !selectedColumns.includes(el.dataIndex));
    }
  }, [selectedColumns, columns]);

  useEffect(() => {
    dispatch(addDrawer({ drawerId: 'add_customers_drawer', isCollapsed: false }));
    dispatch(getCustomersAction());
    dispatch(getbranchTypeListAction());
    dispatch(getAllCountriesWithFlagAction());
  }, [dispatch]);

  const onOpenDrawer = useCallback(() => {
    dispatch(
      drawerUpdate({
        drawerId: 'add_customers_drawer',
        isCollapsed: true,
      }),
    );
  }, [dispatch]);

  const onDrawerClose = useCallback(() => {
    dispatch(
      drawerUpdate({
        drawerId: 'add_customers_drawer',
        isCollapsed: false,
      }),
    );
    pertnerForm.resetFields();
  }, [dispatch, pertnerForm]);

  const onCustomerSave = useCallback(async () => {
    try {
      const val = await pertnerForm.validateFields();
      if (val.id) {
        await dispatch(
          updadateCustomer({
            id: val.id,
            changes: {
              ...val,
              updated_date: new Date().toLocaleDateString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                // optional: for a 24-hour clock (common in 'en-GB' and technical contexts)
                hour12: false,
              }),
            },
          }),
        );
      } else {
        await dispatch(
          addCustomer({
            ...val,
            id: uuidv4(),
            created_date: new Date().toLocaleDateString('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false,
            }),
            updated_date: new Date().toLocaleDateString('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false,
            }),
          }),
        );
      }
      onDrawerClose();
    } catch (error) {
      console.log('error ====== ', error);
    } finally {
      //
    }
  }, [pertnerForm, dispatch, onDrawerClose]);

  const onCustomerEdit = useCallback(
    (el: any) => {
      pertnerForm.setFieldsValue(el);
      onOpenDrawer();
    },
    [onOpenDrawer, pertnerForm],
  );

  const onRemoveCustomer = useCallback(
    (el: any) => {
      dispatch(removeCustomer(el.id));
    },
    [dispatch],
  );

  return (
    <>
      <Card
        title={<SearchComponent searchLabel="Partners List" onSearch={(val: string) => console.log('=======', val)} />}
        extra={
          <Space>
            <DropdownWithCheckboxes
              tableColumns={columns}
              onFilterChangeValue={(val: string[]) => {
                setSelectedColumns(val);
              }}
            />
            <Button onClick={onOpenDrawer}>Add</Button>
          </Space>
        }>
        <TableComponent rowKey={'id'} columns={filteredColumns} dataSource={customerList} />
      </Card>

      <Drawer
        title={
          <Flex justify="space-between">
            <span>{id ? 'Edit' : 'Add'} Partner</span>
            <RiCloseLine size={20} onClick={onDrawerClose} className="cursor-pointer" />
          </Flex>
        }
        width={'60%'}
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
        }>
        <Form form={pertnerForm} layout="vertical">
          <AddCustomerForm />
        </Form>
      </Drawer>
    </>
  );
};

export default memo(PartnerWrapper);
