import React from "react";
import { Button, Form, Input } from "antd";
import checkPassword from "../../utils/checkPassword";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
function Register() {
  const [form] = Form.useForm();
  const savePerson = async (person) => {
    try {
      const result = await axios.post(
        "http://localhost:5000/auth/register",
        person,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(result.data.message);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const onFinish = async (values) => {
    if (checkPassword(values.password, values.confirmPassword)) {
      const person = {
        fullname: values.fullname,
        username: values.username,
        email: values.email,
        password: values.password,
      };
      await savePerson(person);
      onReset();
    } else {
      toast.error("Do not match passwords");
    }
  };

  const onReset = () => {
    form.resetFields();
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
        resetFields={onReset}
        form={form}
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
            { 
              min: 5,
              message: "Full Name must be at least 5 characters long"
            },
            { 
              max: 40,
              message: "Full Name cannot be longer than 40 characters"
            },
          ]}
        >
          <Input placeholder="John Doe" />
        </Form.Item>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
            {
              min: 5,
              message: "Username must be at least 5 characters long",
            },
            {
              max: 18,
              message: "Username cannot be longer than 18 characters",
            },
          ]}
        >
          <Input placeholder="johndoe" />
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
            {
              min: 8,
              message: "Password must be at least 8 characters long",
            },
            {
              max: 25,
              message: "Password cannot be longer than 25 characters",
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
            {
              min: 8,
              message: "Password must be at least 8 characters long",
            },
            {
              max: 25,
              message: "Password cannot be longer than 25 characters",
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
