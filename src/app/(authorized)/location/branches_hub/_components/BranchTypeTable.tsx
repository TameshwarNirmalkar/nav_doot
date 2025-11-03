'use client';

import IconLoader from '@src/components/IconLoader/IconLoader';
import TableComponent from '@src/components/Tables/TableComponent';
import { selectBranchTypeList } from '@src/store/branch_type';
import { addBranchTypeAction, updateBranchTypeAction } from '@src/store/branch_type/action';
import { branchTypeIsLoading } from '@src/store/branch_type/memo_branchtype_selector';
import { useAppDispatch, useAppSelector } from '@src/store/redux_hooks';
import { App, Button, Drawer, Flex, Input, Space, Table } from 'antd';
import React, { memo, useCallback, useState } from 'react';
import { BiEdit, BiTrash } from 'react-icons/bi';
import { HiPlusCircle } from 'react-icons/hi';
import { RiCloseLine } from 'react-icons/ri';

export default memo(function BranchTypeTable() {
  const branchTypeList = useAppSelector(selectBranchTypeList);
  const isLoading = useAppSelector(branchTypeIsLoading);
  const dispatch = useAppDispatch();

  const [branchtype_name, setBranchTypeName] = useState<string>('');
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [branchObject, setBranchObject] = useState<{ branchtype_id: number }>({ branchtype_id: 0 });

  const { message } = App.useApp();
  const branchtype_coloumns = [
    {
      title: 'Branch Id',
      dataIndex: 'branchtype_id',
      key: 'branchtype_id',
      width: 120,
    },
    {
      title: 'Branch Type',
      dataIndex: 'branchtype_name',
      key: 'branchtype_name',
    },
    {
      title: 'Action',
      dataIndex: 'branchtype_name',
      key: 'branchtype_name',
      width: 100,
      render: (text: string, row: any) => (
        <Space>
          <BiEdit size={18} className="cursor-pointer text-green-600" onClick={() => onEditBranchNameHandler(row)} />
          <BiTrash size={18} className="cursor-pointer text-red-700" />
        </Space>
      ),
    },
  ];

  const onSave = async (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    if (!branchtype_name) {
      message.error('Field should not be empty');
    } else {
      if (branchObject.branchtype_id) {
        await dispatch(
          updateBranchTypeAction({
            branchtype_name: branchtype_name
              .split(' ')
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' '),
            branchtype_id: branchObject.branchtype_id,
          }),
        );
      } else {
        await dispatch(
          addBranchTypeAction({
            branchtype_name: branchtype_name
              .split(' ')
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' '),
            branchtype_id: branchTypeList.length + 1,
          }),
        );
      }
      setBranchTypeName('');
      onDrawerClose();
    }
  };

  const onDrawerOpen = () => {
    setIsCollapsed(true);
  };
  const onDrawerClose = () => {
    setIsCollapsed(false);
  };

  const onEditBranchNameHandler = useCallback((row: any) => {
    onDrawerOpen();
    setBranchObject(row);
    setBranchTypeName(row.branchtype_name);
  }, []);

  return (
    <div>
      <TableComponent rowKey={'branchtype_id'} columns={branchtype_coloumns} dataSource={branchTypeList} />

      <Drawer
        title={
          <Flex justify="space-between">
            {/* <span>{id ? 'Edit Location' : 'Add Location'}</span> */}
            <span>Edit Branch</span>
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
        }
      >
        <div className="flex flex-col gap-3">
          {/* onChange={(e) => setZoneName(e.target.value)} */}
          <label>Branch Name</label>
          <div>
            <Input name="branchtype_name" value={branchtype_name} onChange={(e) => setBranchTypeName(e.target.value)} placeholder="Head Office" />
          </div>
        </div>
      </Drawer>
    </div>
  );
});
