"use client";

import IconLoader from "@src/components/IconLoader/IconLoader";
import { selectBranchTypeList } from "@src/store/branch_type";
import { addBranchTypeAction, getbranchTypeListAction } from "@src/store/branch_type/action";
import { branchTypeIsLoading } from "@src/store/branch_type/memo_branchtype_selector";

import { useAppDispatch, useAppSelector } from "@src/store/redux_hooks";
import { App, Button, Divider, Flex, Form, Input, InputRef, Select, Space } from "antd";
import React, { memo, useEffect, useRef, useState } from "react";
import { HiPlusCircle } from "react-icons/hi";

export default memo(function BranchesForm() {
  const branchTypeList = useAppSelector(selectBranchTypeList);
  const isLoading = useAppSelector(branchTypeIsLoading);
  const dispatch = useAppDispatch();

  const [branchtype_name, setBranchName] = useState<string>("");
  const inputRef = useRef<InputRef>(null);

  const { message } = App.useApp();

  useEffect(() => {
    dispatch(getbranchTypeListAction());
  }, [dispatch]);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBranchName(event.target.value);
  };

  const addNewBranch = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    if (!branchtype_name) {
      message.error("Field should not be empty");
    } else {
      dispatch(addBranchTypeAction({ branchtype_name, branchtype_id: branchTypeList.length }));
      setBranchName("");
    }
  };

  return (
    <div className="w-full">
      <Form.Item
        layout="vertical"
        label={
          <Space>
            <span>Branch</span>
          </Space>
        }
        name="branchtype_id"
        rules={[{ required: true, message: "Required" }]}
      >
        <Select
          style={{ width: "100%" }}
          placeholder="Select Branch"
          optionFilterProp="label"
          filterSort={(optionA, optionB) => (optionA?.branchtype_name ?? "").toLowerCase().localeCompare((optionB?.branchtype_name ?? "").toLowerCase())}
          fieldNames={{ label: "branchtype_name", value: "branchtype_id" }}
          options={branchTypeList}
          popupRender={(menu) => (
            <>
              {menu}
              <Divider style={{ margin: "8px 0" }} />
              <Space className="p-3">
                <Input placeholder="Please missing branch name" ref={inputRef} value={branchtype_name} onChange={onNameChange} onKeyDown={(e) => e.stopPropagation()} />
                <Button type="primary" icon={isLoading ? <IconLoader showLoader={isLoading} iconSize={20} /> : <HiPlusCircle />} onClick={addNewBranch} disabled={isLoading}>
                  Add Branch
                </Button>
              </Space>
            </>
          )}
        />
      </Form.Item>
    </div>
  );
});
