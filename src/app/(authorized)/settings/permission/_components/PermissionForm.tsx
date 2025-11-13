import SelectWithAdd from '@src/components/SelectWithAdd/SelectWithAdd';
import { Form, Input } from 'antd';
import React, { memo } from 'react';

export default memo(function PermissionForm() {
  const permissionForm = Form.useFormInstance();
  return (
    <div>
      <Form.Item name="module_name" hidden>
        <Input hidden />
      </Form.Item>

      <Form.Item name="role" hidden>
        <Input hidden />
      </Form.Item>
      <Form.Item name="user_branch" hidden>
        <Input hidden />
      </Form.Item>

      <SelectWithAdd
        loadingState={false}
        dropDownList={[
          { field_id: 1, field_name: 'Dashboard' },
          { field_id: 2, field_name: 'Booking' },
          { field_id: 3, field_name: 'Delivery' },
          { field_id: 4, field_name: 'Outscan/Inscan' },
          { field_id: 5, field_name: 'Pod Management' },
          { field_id: 6, field_name: 'Tracking' },
          { field_id: 7, field_name: 'Analystics' },
        ]}
        formItemLabel="Module Name"
        field_id="module_code"
        buttonLabel="Add Module"
        onAddHandler={(val) => {
          // setRoleList((prev) => prev.concat({ field_name: val, field_id: val.toUpperCase() }));
        }}
      />

      <SelectWithAdd
        loadingState={false}
        dropDownList={[
          { field_id: 1, field_name: 'Admin' },
          { field_id: 2, field_name: 'User' },
          { field_id: 3, field_name: 'Manager' },
        ]}
        formItemLabel="User Role"
        field_id="user_role"
        buttonLabel="Add Role"
        onAddHandler={(val) => {
          // setRoleList((prev) => prev.concat({ field_name: val, field_id: val.toUpperCase() }));
        }}
      />

      <Form.Item name="user_email" label="User Email" rules={[{ required: true, message: 'Required' }]}>
        <Input />
      </Form.Item>

      <SelectWithAdd
        loadingState={false}
        dropDownList={[
          { field_id: 1, field_name: 'Read' },
          { field_id: 2, field_name: 'Write' },
          { field_id: 3, field_name: 'Delete' },
          { field_id: 4, field_name: 'ReadOnly' },
        ]}
        formItemLabel="Permission"
        field_id="user_permission"
        buttonLabel="Add Role"
        onAddHandler={(val) => {
          // setRoleList((prev) => prev.concat({ field_name: val, field_id: val.toUpperCase() }));
        }}
      />
    </div>
  );
});
