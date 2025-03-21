import React from "react";
import { Button, Form, Input, InputNumber } from "antd";
import checkPassword from "../../utils/checkPassword";
import { ToastContainer, toast } from 'react-toastify';
function Register() {
  const onFinish = (values) => {
    if (checkPassword(values.password, values.confirmPassword)) {
      toast.success('Wow so easy !')
    }
    else{
      toast.error("Do not match passwords")
    }
  };
  const onFinishFailed = (errorInfo) => {
    const error = String(errorInfo.errorFields[0].errors[0]);
    toast.error(error);
  };
  return (
    <>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: "80%",
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Full Name"
          name="fullname"
          rules={[
            {
              required: true,
              message: "Please input your name and surname!",
            },
          ]}
        >
          <Input placeholder="John Doe" />
        </Form.Item>
        <Form.Item
          label="Age"
          name="age"
          rules={[
            {
              type: "number",
              required: true,
              message: "Please input your age!",
            },
          ]}
        >
          <InputNumber className="!w-full" min={18} max={99} placeholder="18" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input placeholder="john@doe.com" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password placeholder="Confirm Password" />
        </Form.Item>
        <Form.Item label={null}>
          <Button
            type="primary"
            htmlType="submit"
            className="!bg-primary w-full !text-background !font-bold hover:!bg-secondary !ml-[-35%] sm:!ml-0"
          >
            Register
          </Button>
        </Form.Item>
      </Form>
      <ToastContainer />
    </>
  );
}

export default Register;
