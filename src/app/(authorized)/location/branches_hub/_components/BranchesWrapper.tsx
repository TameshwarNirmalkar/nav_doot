'use client';
import DropdownWithCheckboxes from '@src/components/FilterColumnComponent/FilterComponents';
import TableComponent from '@src/components/Tables/TableComponent';
import { getbranchTypeListAction } from '@src/store/branch_type/action';
import { addBranch, removeBranch, selectBranchesList, updadateBranch } from '@src/store/branches';
import { getBranchesAction } from '@src/store/branches/action';
import { getAllStatesBasedOnCountryAction } from '@src/store/country_cities/action';
import { addDrawer, drawerUpdate } from '@src/store/drawer';
import { selectIsCollapsedById } from '@src/store/drawer/memoised_drawer_selector';
import { useAppDispatch, useAppSelector } from '@src/store/redux_hooks';
import { AppState } from '@src/store/store_config';
import { getUniqueFilters } from '@src/utility/common_function';
import { Button, Card, Drawer, Flex, Form, Popconfirm, Space, Table, TableColumnsType } from 'antd';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { RiCloseLine, RiFilter3Fill } from 'react-icons/ri';
import { TbTrash } from 'react-icons/tb';
import { v4 as uuidv4 } from 'uuid';
import AddBranchFormComponent from './AddBranchFormComponent';

const BranchesWrapper = () => {
  const dispatch = useAppDispatch();
  const [addBranchForm] = Form.useForm();
  const id = Form.useWatch('id', addBranchForm);
  const isCollapsed = useAppSelector((state: AppState) => selectIsCollapsedById(state, 'add_branch_drawer'));
  const allBranches = useAppSelector(selectBranchesList);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

  useEffect(() => {
    dispatch(addDrawer({ drawerId: 'add_branch_drawer', isCollapsed: false }));
    // dispatch(getAllStatesBasedOnCountryAction({ country: 'India' }));
    dispatch(getAllStatesBasedOnCountryAction({ country: '101' }));
    dispatch(getBranchesAction());
    dispatch(getbranchTypeListAction());
  }, [dispatch]);

  const filterFields = useMemo(() => {
    return {
      branchName: getUniqueFilters(allBranches, 'branch_name'),
      branchType: getUniqueFilters(allBranches, 'branchtype_name'),
      parentBranch: getUniqueFilters(allBranches, 'parent_branch_name'),
      cityName: getUniqueFilters(allBranches, 'city_name'),
      stateName: getUniqueFilters(allBranches, 'state_name'),
    };
  }, [allBranches]);

  const columns: any = useMemo(
    () => [
      {
        title: 'Branch Name',
        dataIndex: 'branch_name',
        key: 'branch_name',
        filtered: true,
        filters: filterFields.branchName,
        filterIcon: <RiFilter3Fill size={20} />,
        onFilter: (value: string, record: any): boolean => {
          return record.branch_name.toLowerCase() === value;
        },
        filterMultiple: true,
      },
      {
        title: 'Branch Type',
        dataIndex: 'branchtype_name',
        key: 'branchtype_name',
        filters: filterFields.branchType,
        filterIcon: <RiFilter3Fill size={20} />,
        onFilter: (value: string, record: any): boolean => {
          return record.branchtype_name.toLowerCase() === value;
        },
        filterMultiple: true,
      },
      {
        title: 'Parent Branch',
        dataIndex: 'parent_branch_name',
        key: 'parent_branch_name',
        filters: filterFields.parentBranch,
        filterIcon: <RiFilter3Fill size={20} />,
        onFilter: (value: string, record: any): boolean => {
          return record.parent_branch_name.toLowerCase() === value;
        },
        filterMultiple: true,
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'City',
        dataIndex: 'city_name',
        key: 'city_name',
        filters: filterFields.cityName,
        filterIcon: <RiFilter3Fill size={20} />,
        onFilter: (value: string, record: any): boolean => {
          return record.city_name.toLowerCase() === value;
        },
        filterMultiple: true,
      },
      {
        title: 'State',
        dataIndex: 'state_name',
        key: 'state_name',
        filters: filterFields.stateName,
        filterIcon: <RiFilter3Fill size={20} />,
        onFilter: (value: string, record: any): boolean => {
          return record.state_name.toLowerCase() === value;
        },
        filterMultiple: true,
      },
      {
        title: 'Created Date',
        dataIndex: 'created_date',
        key: 'created_date',
      },
      {
        title: 'Modified Date',
        dataIndex: 'updated_date',
        key: 'updated_date',
      },
      {
        title: 'Action',
        dataIndex: 'id',
        key: 'id',
        render: (text: string, row: any) => (
          <Space>
            <BiEdit size={20} color="green" className="cursor-pointer" onClick={() => onBranchEdit(row)} />

            <Popconfirm title="Delete" description="Are you sure to delete this record?" okText="Yes" cancelText="No" onConfirm={() => onRemoveBranches(row)}>
              <TbTrash size={20} color="#c00" className="cursor-pointer" />
            </Popconfirm>
          </Space>
        ),
      },
    ],
    [filterFields],
  );

  const filteredColumns = useMemo(() => {
    if (!selectedColumns.length) {
      return columns;
    } else {
      return columns.filter((el: { dataIndex: string }) => !selectedColumns.includes(el.dataIndex));
    }
  }, [selectedColumns, columns]);

  const onOpenDrawer = useCallback(() => {
    dispatch(
      drawerUpdate({
        drawerId: 'add_branch_drawer',
        isCollapsed: true,
      }),
    );
  }, [dispatch]);

  const onDrawerClose = useCallback(() => {
    dispatch(
      drawerUpdate({
        drawerId: 'add_branch_drawer',
        isCollapsed: false,
      }),
    );
    addBranchForm.resetFields();
  }, [dispatch, addBranchForm]);

  const onBranchSave = useCallback(async () => {
    try {
      const val = await addBranchForm.validateFields();
      if (val.id) {
        dispatch(updadateBranch({ id: val.id, changes: { ...val, updated_date: new Date().toLocaleDateString('en-GB') } }));
      } else {
        dispatch(addBranch({ ...val, id: uuidv4(), created_date: new Date().toLocaleDateString('en-GB'), updated_date: new Date().toLocaleDateString('en-GB') }));
      }
    } catch (error) {
      console.log('error ====== ', error);
    } finally {
      onDrawerClose();
    }
  }, [addBranchForm, onDrawerClose, dispatch]);

  const onBranchEdit = useCallback(
    (el: any) => {
      addBranchForm.setFieldsValue(el);
      onOpenDrawer();
    },
    [addBranchForm, onOpenDrawer],
  );

  const onRemoveBranches = useCallback(
    (el: any) => {
      dispatch(removeBranch(el.id));
    },
    [dispatch],
  );

  return (
    <>
      <Card
        title="Branch Gateway"
        extra={
          <Space>
            <DropdownWithCheckboxes
              tableColumns={columns}
              onFilterChangeValue={(val: string[]) => {
                setSelectedColumns(val);
              }}
            />
            <Button type="primary" onClick={onOpenDrawer}>
              Add
            </Button>
          </Space>
        }>
        <TableComponent rowKey={'id'} columns={filteredColumns} dataSource={allBranches} />
      </Card>

      <Drawer
        title={
          <Flex justify="space-between">
            <span>{id ? 'Edit' : 'Add'} Branch</span>
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
              <Button type="primary" htmlType="submit" onClick={onBranchSave}>
                Save
              </Button>
            </Space>
          </Flex>
        }>
        <Form form={addBranchForm} layout="vertical">
          <AddBranchFormComponent />
        </Form>
      </Drawer>
    </>
  );
};

export default memo(BranchesWrapper);
