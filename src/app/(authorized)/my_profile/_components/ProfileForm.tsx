'use client';

import { MailOutlined, PlusOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';
import IconLoader from '@src/components/IconLoader/IconLoader';
import { Button, Flex, Form, Input, message, Upload, UploadFile, UploadProps } from 'antd';
import React, { memo, useState } from 'react';

const { TextArea } = Input;

interface ProfileFormValues {
  profileImage?: UploadFile;
  fullName: string;
  email: string;
  description?: string;
}

export default memo(function ProfileForm() {
  const profileForm = Form.useFormInstance();

  return (
    <div>
      {/* <Form form={profileForm} name="profile_form" layout="vertical"> */}
      {/* --- Full Name --- */}
      <Form.Item
        name="full_name"
        label="Full Name"
        rules={[
          {
            required: true,
            message: 'Please input your Full Name!',
          },
        ]}>
        <Input prefix={<UserOutlined />} placeholder="Enter your full name" />
      </Form.Item>

      {/* --- Email --- */}
      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            required: true,
            message: 'Please input your Email!',
          },
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
        ]}>
        <Input prefix={<MailOutlined />} placeholder="Enter your email address" />
      </Form.Item>

      {/* --- Description --- */}
      <Form.Item
        name="description"
        label="Description"
        rules={[
          {
            required: false, // Making description optional
            message: 'Please write a brief description!',
          },
          {
            max: 300,
            message: 'Description must be less than 300 characters.',
          },
        ]}>
        <TextArea rows={4} placeholder="Tell us a little about yourself (max 300 characters)" />
      </Form.Item>

      {/* --- Form Buttons --- */}
      {/* <Flex justify="end">
          <Form.Item>
            <Button type="default" onClick={onReset} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Flex> */}
      {/* </Form> */}
    </div>
  );
});
