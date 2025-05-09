import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import checkPassword from "../../utils/checkPassword";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
function Register({ setSwitchBtn }) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const savePerson = async (person) => {
    try {
      setLoading(true);
      if (
        !person.fullname ||
        !person.username ||
        !person.email ||
        !person.password
      ) {
        toast.error("Please fill all the fields", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
      });
        return;
      }
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_API_URL}/auth/register`,
        person
      );
      toast(
        `${res.data.user.fullname}, Welcome to InkSpace!`
      );
      setTimeout(() => {
        setSwitchBtn(true);
      }, 1500);
    } catch (err) {
      toast.error(err, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    });
    } finally {
      setLoading(false);
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
      toast.error("Do not match passwords", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    });
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    const error = String(errorInfo.errorFields[0].errors[0]);
    toast.error(error, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
  });
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
              message: "Full Name must be at least 5 characters long",
            },
            {
              max: 40,
              message: "Full Name cannot be longer than 40 characters",
            },
          ]}
        >
          <Input placeholder="John Doe" disabled={loading} />
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
          <Input placeholder="johndoe" disabled={loading} />
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
          <Input placeholder="john@doe.com" disabled={loading} />
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
          <Input.Password placeholder="Password" disabled={loading} />
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
          <Input.Password placeholder="Confirm Password" disabled={loading} />
        </Form.Item>
        <Form.Item label={null}>
          <Button
            type="primary"
            htmlType="submit"
            className={`!bg-primary w-full !text-background !font-bold !ml-[-35%] sm:!ml-0 ${
              loading ? "cursor-wait" : "hover:!bg-secondary"
            }`}
            disabled={loading}
          >
            {loading ? (
              <svg
                aria-hidden="true"
                className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-background"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            ) : (
              ""
            )}
            {loading ? "Loading..." : "Register"}
          </Button>
        </Form.Item>
      </Form>
      <ToastContainer />
    </>
  );
}

export default Register;
