"use client";

import { MailOutlined, PlusOutlined, UploadOutlined, UserOutlined } from "@ant-design/icons";
import IconLoader from "@src/components/IconLoader/IconLoader";
import { Button, Flex, Form, Input, message, Upload, UploadFile, UploadProps } from "antd";
import React, { memo, useState } from "react";

const { TextArea } = Input;

interface ProfileFormValues {
  profileImage?: UploadFile;
  fullName: string;
  email: string;
  description?: string;
}

export default memo(function CompanyForm() {
  const _profileForm = Form.useFormInstance();

  return (
    <div>
      {/* --- Full Name --- */}
      <Form.Item
        name="company_name"
        label="Company Name"
        rules={[
          {
            required: true,
            message: "Please input your Full Name!",
          },
        ]}
      >
        <Input placeholder="Enter your full name" />
      </Form.Item>

      {/* --- Owner Name --- */}
      <Form.Item
        name="owner_name"
        label="Owner Name"
        rules={[
          {
            required: true,
            message: "Required",
          },
        ]}
      >
        <Input placeholder="Enter your owner name" />
      </Form.Item>

      {/* --- Email --- */}
      <Form.Item
        name="company_email"
        label="Email"
        rules={[
          {
            required: true,
            message: "Please input your company email!",
          },
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
        ]}
      >
        <Input placeholder="Enter your company email address" />
      </Form.Item>

      {/* --- GST Number--- */}
      <Form.Item
        name="gst_number"
        label="GST Number"
        rules={[
          {
            required: true,
            message: "Please input your GST Number",
          },
        ]}
      >
        <Input placeholder="Enter your email address" />
      </Form.Item>

      {/* --- Address --- */}
      <Form.Item
        name="address"
        label="Address"
        rules={[
          {
            required: true,
            message: "Please write a brief address!",
          },
          {
            max: 250,
            message: "Description must be less than 250 characters.",
          },
        ]}
      >
        <TextArea rows={4} placeholder="Tell us a little about yourself (max 250 characters)" />
      </Form.Item>

      {/* --- Description --- */}
      <Form.Item
        name="description"
        label="Description"
        rules={[
          {
            required: false,
            message: "Please write a brief description!",
          },
          {
            max: 300,
            message: "Description must be less than 300 characters.",
          },
        ]}
      >
        <TextArea rows={4} placeholder="Tell us a little about yourself (max 300 characters)" />
      </Form.Item>
    </div>
  );
});
