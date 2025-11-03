"use client";

import React, { memo } from "react";
import { Button, Form, Input, message } from "antd";
import { getCsrfToken } from "next-auth/react";

const SignIn = () => {
  const [signForm] = Form.useForm();

  const onFormSubmit = async (values: { email_address: string; password: string }) => {
    const csrfToken = await getCsrfToken();
    const response = await fetch("/api/auth/callback/credentials", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        csrfToken: csrfToken,
        email_address: values.email_address,
        password: values.password,
      }),
    });

    if (response.ok) {
      window.location.href = "/home";
    } else {
      message.error("Sign in failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="w-full">
      <Form form={signForm} layout="vertical" onFinish={onFormSubmit} style={{ width: "100%" }}>
        <Form.Item name={"emailaddress"} label="Email address" rules={[{ required: true, message: "Please input your email address!" }]}>
          <Input type="text" />
        </Form.Item>
        <Form.Item name={"password"} label="Password" rules={[{ required: true, message: "Please input your password!" }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item label={null}>
          <Button htmlType="submit" type="primary">
            Sign in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default memo(SignIn);
